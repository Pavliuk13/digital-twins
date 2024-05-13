import { memo } from 'react';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { Device } from '@@types/device';

import DeviceCard from './DeviceCard';

import styles from './Content.module.scss';

function Content() {
  const { data } = usePageContentContext<Device[]>();

  return (
    !!data?.length && (
      <div className={styles.wrapper}>
        <div className={styles.devices}>
          {data.map((device) => {
            return <DeviceCard key={device.id} device={device} />;
          })}
        </div>
      </div>
    )
  );
}

export default memo(Content);
