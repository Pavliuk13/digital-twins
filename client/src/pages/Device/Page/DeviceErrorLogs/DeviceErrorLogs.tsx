import { memo } from 'react';

import Typography from '@@components/ui/Typography';
import Card from '@@components/common/Card';
import Button from '@@components/ui/Button';

import { usePageContentContext } from '@@contexts/PageContentContext';

import DeviceErrorLog from './DeviceErrorLog';

import { Data } from '../types';

import styles from './DeviceErrorLogs.module.scss';

function DeviceErrorLogs() {
  const {
    data: { deviceErorLogs },
    isLoading,
    refetch,
  } = usePageContentContext<Data>();

  return (
    <div className={styles.wrapper}>
      <Card isScale={false}>
        <div className={styles.header}>
          <Typography variant="subheading2" bottomOffset={16}>
            Error Log
          </Typography>
          <Button
            variant="outline"
            color="grey_200"
            size="small"
            disabled={isLoading}
            onClick={refetch}
          >
            Refresh
          </Button>
        </div>
        <div className={styles.list}>
          {deviceErorLogs.length ? (
            [...deviceErorLogs]?.reverse().map((errorLog, index) => {
              return (
                <DeviceErrorLog
                  key={errorLog.id}
                  sequenceNumber={deviceErorLogs.length - index}
                  errorLog={errorLog}
                />
              );
            })
          ) : (
            <Typography variant="body">No errors</Typography>
          )}
        </div>
      </Card>
    </div>
  );
}

export default memo(DeviceErrorLogs);
