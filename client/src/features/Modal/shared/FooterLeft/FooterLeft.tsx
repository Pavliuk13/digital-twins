import { ReactNode } from 'react';

import styles from './FooterLeft.module.scss';

interface FooterLeftProps {
  children: ReactNode;
}

function FooterLeft(props: FooterLeftProps) {
  const { children } = props;

  return <div className={styles.footerLeft}>{children}</div>;
}

export default FooterLeft;
