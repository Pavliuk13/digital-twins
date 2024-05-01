import { memo } from 'react';

import { usePageContentContext } from '@@contexts/PageContentContext';
import { copyToClipboard } from '@@utils/common/copyToClipboard';

import Typography from '@@components/ui/Typography';
import Image from '@@components/ui/Image';

import CopySvg from '@@assets/icons/copy.svg';

import { Device } from '@@types/device';

import { HARDWARE_IMAGE } from '@@constants/hardware';

import styles from './DeviceInformation.module.scss';

function DeviceInformation() {
  const { data } = usePageContentContext<Device>();

  const handleCopyUGuid = () => {
    copyToClipboard(data.uGuid);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={HARDWARE_IMAGE[data.template.hardware]} alt="Hardware" />
      </div>
      <div className={styles.information}>
        <div className={styles.information__row}>
          Name: <Typography variant="subheading2">{data.name}</Typography>
        </div>
        <div className={styles.information__row}>
          uGuid:
          <Typography variant="subheading2" onClick={handleCopyUGuid}>
            {data.uGuid} <Image image={CopySvg} cursor="pointer" size={18} />
          </Typography>
        </div>
        <div className={styles.information__row}>
          Template:
          <Typography variant="subheading2">{data.template.name}</Typography>
        </div>
        <div className={styles.information__row}>
          Created by:
          <Typography variant="subheading2">
            {data.user.name} ({data.user.email})
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default memo(DeviceInformation);
