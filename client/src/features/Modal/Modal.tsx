import { useEffect, useCallback, useMemo, useRef, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';
import _isFunction from 'lodash/isFunction';
import _isBoolean from 'lodash/isBoolean';

import Portal from '@@components/common/Portal';

import { ENTER, ESCAPE } from '@@constants/keys';
import { MOUSEDOWN, MOUSE_BUTTON_RIGHT, KEYUP } from '@@constants/userEvents';

import { useStateCallback } from '@@hooks/common/useStateCallback';
import { useEventListener } from '@@hooks/common/useEventListener';
import { useLockBodyScroll } from '@@hooks/common/useLockBodyScroll';

import { ModalProvider } from '@@contexts/ModalContext';

import { showModal, hideModal } from '@@store/modals/slice';
import { makeSelectDirtyStateModal } from '@@store/modals/selectors';

import { ConfirmCloseModalName } from '@@constants/modal';

import { ModalPosition, ModalSize } from '@@types/ui';

import { useModalBlur } from './hooks';

import ModalBackdrop from './ModalBackdrop';
import ModalWrapper from './ModalWrapper';

import { getAnimationStyle } from './utils';

import styles from './Modal.module.scss';

interface ModalProps {
  formProps?: Record<string, unknown>;
  size?: ModalSize;
  position?: ModalPosition;
  children: ReactNode;
  className?: string;
  closeOnMask?: boolean;
  closeOnEsc?: boolean;
  checkDirtyState?: boolean;
  submitOnEnter?: boolean;
  onClose?: () => void;
}

function Modal(props: ModalProps) {
  const {
    dataCid = '',
    contentRef,
    size = 'size_550',
    type,
    position = 'right',
    formProps = {},
    children,
    className = '',
    checkDirtyState = true,
    submitOnEnter = true,
    closeOnMask = true,
    closeOnEsc = true,
    isOpen = false,
    isTopModal,
    onClose,
  } = props;

  const dispatch = useDispatch();

  const modalRef = useRef();
  const backdropRef = useRef(null);
  const canCloseOnMask = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      canCloseOnMask.current = true;
    }, 200);
  }, []);

  const selectDirtyStateModal = useMemo(makeSelectDirtyStateModal, []);

  // const extraSmall = useSelector(selectIsExtraSmall);

  const isDirtyStateModalActive = useSelector((state) => {
    return selectDirtyStateModal(state, ConfirmCloseModalName);
  });

  const formMethods = useForm({ ...formProps });
  const {
    formState: { isDirty, isSubmitting },
  } = formMethods;

  const [events, setEvents] = useStateCallback({});

  const animationStyle = getAnimationStyle(position, isOpen);

  const isCenterPosition = position === 'center' || position === 'bottom';

  const showModalAction = useCallback((modalType, modalProps) => {
    return dispatch(showModal(modalType, modalProps));
  }, []);

  const closeModal = useCallback(() => {
    if (isTopModal) {
      dispatch(hideModal());
      onClose?.();
    }
  }, [isTopModal, onClose]);

  const showDirtyStateModal = () => {
    showModalAction(ConfirmCloseModalName, {
      onConfirm: closeModal,
    });
  };

  const startCloseRoutine = () => {
    if (isDirtyStateModalActive) {
      return closeModal();
    }

    return isDirty && checkDirtyState && isTopModal && !isSubmitting
      ? showDirtyStateModal()
      : closeModal();
  };

  const handleClick = (e) => {
    e.stopPropagation();

    if (e.button === MOUSE_BUTTON_RIGHT) {
      return;
    }

    if (
      isTopModal &&
      !modalRef.current?.contains(e.target) &&
      backdropRef.current?.contains(e.target)
    ) {
      setEvents({ ...events, maskClicked: true }, () => {
        setEvents({}); // Reset modal events state.
      });

      if (closeOnMask && canCloseOnMask.current) {
        startCloseRoutine();
      }
    }
  };

  const handleKeyup = (e) => {
    const escapePressed = e.key === ESCAPE;
    const enterPressed = e.key === ENTER;
    const shiftEnterPressed = e.key === ENTER && e.shiftKey;

    if (escapePressed || enterPressed || shiftEnterPressed) {
      const { enterPressed: externalEnterPressed } = events;

      setEvents(
        {
          ...events,
          escapePressed,
          enterPressed: _isBoolean(externalEnterPressed)
            ? externalEnterPressed
            : enterPressed,
          shiftEnterPressed,
        },
        () => {
          setEvents({}); // Reset modal events state.
        },
      );
    }

    if (!isTopModal || !closeOnEsc) {
      return;
    }

    if (e.key === ESCAPE) {
      startCloseRoutine();
    }
  };

  // Initiate custom hooks.
  useEventListener(KEYUP, handleKeyup);
  useEventListener(MOUSEDOWN, handleClick);
  useLockBodyScroll();
  useModalBlur();

  const modalClassName = classNames(
    styles.modal,
    className,
    styles[animationStyle],
    {
      [styles.modal_fullWidth]: position === 'bottom',
      [styles.modal_borderRadius]: position === 'center',
      [styles.modal_stretch]: position === 'right',
    },
  );

  const modalContentClassName = classNames(styles.modal__content, {
    [styles.modal__content_stretch]: position === 'right',
    [styles[`modal__content_${size}`]]: size,
  });

  const modalProviderValue = {
    events,
    submitOnEnter,
    isTopModal,
    isCenterPosition,
    isOpen,
    breakpoints: { extraSmall: false },
    setEvents,
    closeOnEsc,
    closeOnMask,
    closeModal,
  };

  return (
    <Portal>
      <ModalBackdrop ref={backdropRef} isAnimationIn={isOpen}>
        <ModalWrapper position={position}>
          <div
            data-cid={`modal-container-${type}`}
            ref={modalRef}
            className={modalClassName}
          >
            <div ref={contentRef} className={modalContentClassName}>
              <ModalProvider value={modalProviderValue}>
                <div data-cid={dataCid} className={styles.childrenWrapper}>
                  <FormProvider {...formMethods}>
                    {_isFunction(children)
                      ? children(modalProviderValue)
                      : children}
                  </FormProvider>
                </div>
              </ModalProvider>
            </div>
          </div>
        </ModalWrapper>
      </ModalBackdrop>
    </Portal>
  );
}

export default Modal;
