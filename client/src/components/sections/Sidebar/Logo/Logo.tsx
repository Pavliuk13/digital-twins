import { memo } from 'react';

import Image from '@@components/ui/Image';

import SmartLabSvg from '@@assets/icons/smart_lab_logo.svg';

import styles from './Logo.module.scss';

function Logo() {
  return (
    <div className={styles.wrapper}>
      <Image image={SmartLabSvg} size={36} />
      <span className={styles.smart}>smart</span>
      <span className={styles.lab}>lab</span>
    </div>
  );
}

export default memo(Logo);
