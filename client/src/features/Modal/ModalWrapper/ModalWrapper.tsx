import { ReactNode, forwardRef } from 'react';
import classNames from 'classnames';

import { ModalPosition } from '@@types/ui';

import styles from './ModalWrapper.module.scss';

interface ModalWrapperProps {
  position?: ModalPosition;
  children: ReactNode;
}

const ModalWrapperWithRef = forwardRef<HTMLDivElement, ModalWrapperProps>(
  function ModalWrapper(props, ref) {
    const { position = 'right', children } = props;

    const modalWrapperCls = classNames(styles.modalWrapper, {
      [styles.justifyCenter]: position === 'center',
      [styles.justifyRight]: position === 'right',
      [styles.alignBottom]: position === 'bottom',
    });

    return (
      <div className={modalWrapperCls} ref={ref}>
        {children}
      </div>
    );
  },
);

export default ModalWrapperWithRef;
