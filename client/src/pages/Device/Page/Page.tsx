import { memo } from 'react';

import DeviceInformation from './DeviceInformation';
import DeviceWidgets from './DeviceWidgets';

import styles from './Page.module.scss';

function Page() {
  return (
    <div className={styles.wrapper}>
      <DeviceInformation />
      <DeviceWidgets />
    </div>
  );
}

export default memo(Page);
