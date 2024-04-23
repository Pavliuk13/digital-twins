import { memo, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './ModalFooter.module.scss';

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
  withBackground?: boolean;
}

function ModalFooter(props: ModalFooterProps) {
  const { children, className = '', withBackground = false } = props;

  const modalFooterCls = classNames(styles.modalFooter, className, {
    [styles.background]: withBackground,
  });

  return <div className={modalFooterCls}>{children}</div>;
}

export default memo(ModalFooter);
