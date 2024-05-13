import { memo } from 'react';

import Typography from '@@components/ui/Typography';

import { dateFormat } from '@@utils/date/dateFormat';

import { DeviceErrorLog as DeviceErrorLogType } from '@@types/device';

import styles from './DeviceErrorLog.module.scss';

interface DeviceErrorLogProps {
  sequenceNumber: number;
  errorLog: DeviceErrorLogType;
}

function DeviceErrorLog(props: DeviceErrorLogProps) {
  const { sequenceNumber, errorLog } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.device}>
        <div>
          <Typography variant="bodyBold" bottomOffset={4}>
            №{sequenceNumber}: {errorLog.description}
          </Typography>
          <Typography variant="description" color="grey_200">
            {dateFormat(errorLog.dateTime)}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default memo(DeviceErrorLog);
