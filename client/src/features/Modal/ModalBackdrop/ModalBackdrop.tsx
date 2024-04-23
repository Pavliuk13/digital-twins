import { ReactNode, forwardRef } from 'react';
import classNames from 'classnames';

import styles from './ModalBackdrop.module.scss';

interface ModalBackdropProps {
  dataCid?: string;
  children: ReactNode;
  invisible?: boolean;
  isAnimationIn?: boolean;
}

const ModalBackdropWithRef = forwardRef<HTMLDivElement, ModalBackdropProps>(
  function ModalBackdrop(props, ref) {
    const {
      dataCid = 'modal-backdrop',
      children,
      invisible = false,
      isAnimationIn = false,
    } = props;

    const rootClassName = classNames(styles.backdrop, {
      [styles.invisible]: invisible,
      [styles.backdropAnimationIn]: isAnimationIn,
      [styles.backdropAnimationOut]: !isAnimationIn,
    });

    return (
      <div ref={ref} data-cid={dataCid} className={rootClassName}>
        {children}
      </div>
    );
  },
);

export default ModalBackdropWithRef;
