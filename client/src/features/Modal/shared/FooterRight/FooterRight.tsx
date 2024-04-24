import { ReactNode } from 'react';

import styles from './FooterRight.module.scss';

interface FooterRightProps {
  children: ReactNode;
}

function FooterRight(props: FooterRightProps) {
  const { children } = props;

  return <div className={styles.footerRight}>{children}</div>;
}

export default FooterRight;
