import { memo, forwardRef, useRef, ReactNode } from 'react';
import classNames from 'classnames';

// import Spinner from '@@components/Spinner';

import { useModalContext } from '@@contexts/ModalContext';
import { useWithScrollbar } from '@@hooks/common/useWithScrollbar';

import styles from './ModalBody.module.scss';

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
  isShowSpinner?: boolean;
  isFullWidth?: boolean;
  withoutOverflow?: boolean;
  withoutFixedHeight?: boolean;
  withoutScrollbarPadding?: boolean;
}

const ModalBodyWithRef = forwardRef<HTMLDivElement, ModalBodyProps>(
  function ModalBody(props, ref) {
    const {
      className = '',
      children,
      isShowSpinner,
      isFullWidth,
      withoutOverflow,
      withoutFixedHeight,
      withoutScrollbarPadding,
      ...other
    } = props;

    const { isCenterPosition } = useModalContext();

    const defaultRef = useRef();
    const modalRef = ref || defaultRef;

    const [withScrollbar, setRef] = useWithScrollbar({ targetRef: modalRef });

    const modalBodyCls = classNames(styles.modalBody, className, {
      [styles.centerModalStyle]: isCenterPosition && !withoutFixedHeight,
      [styles.withScrollbar]: !withoutScrollbarPadding && withScrollbar,
      [styles.fullWidth]: isFullWidth,
      [styles.withoutOverflow]: withoutOverflow,
    });

    return (
      <div className={modalBodyCls} ref={setRef} {...other}>
        {/* {isShowSpinner && (
          <div className={styles.spinnerWrapper}>
            <Spinner size="big" />
          </div>
        )} */}
        {children}
      </div>
    );
  },
);

export default memo(ModalBodyWithRef);
