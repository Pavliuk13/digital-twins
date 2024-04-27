import { useCallback, useEffect } from 'react';

import Button from '@@components/ui/Button';
import Image from '@@components/ui/Image';

import TrashSvg from '@@assets/icons/trash.svg';

import { useModalContext } from '@@contexts/ModalContext';

import { hideModal, showModal } from '@@store/modals/slice';
import { useDispatch } from '@@store/index';

import { ConfirmDeleteModalName } from '@@constants/modal';

interface DeleteButtonProps {
  confirmProps?: {
    [key: string]: boolean;
    onConfirm?: () => void;
  };
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

function DeleteButton(props: DeleteButtonProps) {
  const { confirmProps, disabled, isLoading, onClick, ...restProps } = props;

  const dispatch = useDispatch();

  const {
    events: { enterPressed, shiftEnterPressed },
    isTopModal,
    closeModal,
  } = useModalContext();

  const showModalAction = useCallback((modalType, modalProps) => {
    return dispatch(showModal(modalType, modalProps));
  }, []);

  const hideModalAction = useCallback(() => {
    return dispatch(hideModal());
  }, []);

  const handleClick = useCallback(() => {
    if (!confirmProps.onConfirm) {
      onClick(closeModal);
    } else {
      showModalAction(ConfirmDeleteModalName, {
        ...confirmProps,
        hideModalAction,
      });
    }
  }, [confirmProps, closeModal, onClick, showModalAction]);

  useEffect(() => {
    if (isTopModal && enterPressed && !shiftEnterPressed) {
      handleClick();
    }
  }, [enterPressed]);

  return (
    <Button
      dataCid="modal-delete-button"
      variant="outline"
      type="submit"
      size="small"
      color="red_500"
      isLoading={isLoading}
      disabled={disabled}
      onClick={handleClick}
      {...restProps}
    >
      <Image image={TrashSvg} cursor="pointer" />
    </Button>
  );
}

export default DeleteButton;
