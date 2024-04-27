import { memo } from 'react';

import DeviceList from './DeviceList';
import TemplateSettings from './TemplateSettings';

import styles from './Page.module.scss';

function Page() {
  return (
    <div className={styles.wrapper}>
      <DeviceList />
      <TemplateSettings />
    </div>
  );
}

export default memo(Page);
