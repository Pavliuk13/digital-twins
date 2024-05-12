import { memo } from 'react';

import DeviceInformation from './DeviceInformation';
import DeviceWidgets from './DeviceWidgets';
import DeviceErrorLogs from './DeviceErrorLogs';
import DeviceStatistics from './DeviceStatistics';

import styles from './Page.module.scss';

function Page() {
  return (
    <div>
      <div className={styles.wrapper}>
        <DeviceInformation />
        <DeviceWidgets />
      </div>
      <DeviceErrorLogs />
      <DeviceStatistics />
    </div>
  );
}

export default memo(Page);
