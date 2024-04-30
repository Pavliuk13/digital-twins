import { memo } from 'react';

import Content from './Content';

import styles from './Page.module.scss';

function Page() {
  return (
    <div className={styles.wrapper}>
      <Content />
    </div>
  );
}

export default memo(Page);
