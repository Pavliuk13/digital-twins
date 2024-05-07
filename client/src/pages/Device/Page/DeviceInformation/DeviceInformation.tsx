import { memo } from 'react';

import { usePageContentContext } from '@@contexts/PageContentContext';
import { copyToClipboard } from '@@utils/common/copyToClipboard';

import Typography from '@@components/ui/Typography';
import Image from '@@components/ui/Image';

import CopySvg from '@@assets/icons/copy.svg';

import { Hardware } from '@@types/hardware';

import { HARDWARE_IMAGE } from '@@constants/hardware';

import { Data } from '../types';

import styles from './DeviceInformation.module.scss';

function DeviceInformation() {
  const {
    data: { device },
  } = usePageContentContext<Data>();

  const handleCopyUGuid = () => {
    copyToClipboard(device.uGuid);
  };

  const handleCopyTopic = () => {
    copyToClipboard(`${Hardware[device.template.hardware]}/${device.uGuid}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={HARDWARE_IMAGE[device.template.hardware]} alt="Hardware" />
      </div>
      <div className={styles.information}>
        <div className={styles.information__row}>
          Name: <Typography variant="subheading2">{device.name}</Typography>
        </div>
        <div className={styles.information__row}>
          uGuid:
          <Typography variant="subheading2" onClick={handleCopyUGuid}>
            {device.uGuid} <Image image={CopySvg} cursor="pointer" size={18} />
          </Typography>
        </div>
        <div className={styles.information__row}>
          Topic:
          <Typography variant="subheading2" onClick={handleCopyTopic}>
            {Hardware[device.template.hardware]}/{device.uGuid}{' '}
            <Image image={CopySvg} cursor="pointer" size={18} />
          </Typography>
        </div>
        <div className={styles.information__row}>
          Template:
          <Typography variant="subheading2">{device.template.name}</Typography>
        </div>
        <div className={styles.information__row}>
          Digital twin url:
          <Typography variant="subheading2">
            {device.azureDigitalTwinUrl ? (
              <a
                href={device.azureDigitalTwinUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                {device.azureDigitalTwinUrl}
              </a>
            ) : (
              '-'
            )}
          </Typography>
        </div>
        <div className={styles.information__row}>
          Created by:
          <Typography variant="subheading2">
            {device.user.name} ({device.user.email})
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default memo(DeviceInformation);
