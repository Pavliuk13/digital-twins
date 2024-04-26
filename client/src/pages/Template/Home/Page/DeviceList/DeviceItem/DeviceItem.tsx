import { memo } from 'react';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';

import { copyToClipboard } from '@@utils/common/copyToClipboard';

import { usePageContentContext } from '@@contexts/PageContentContext';

import Typography from '@@components/ui/Typography';
import Image from '@@components/ui/Image';
import Button from '@@components/ui/Button';

import CopySvg from '@@assets/icons/copy.svg';
import EditSvg from '@@assets/icons/edit.svg';

import { Device } from '@@types/device';
import { Template } from '@@types/template';

import { DeviceModalName } from '@@constants/modal';

import styles from './DeviceItem.module.scss';

interface DeviceItemProps {
  device: Device;
}

function DeviceItem(props: DeviceItemProps) {
  const { device } = props;

  const dispatch = useDispatch();

  const { refetch } = usePageContentContext<Template>();

  const handleEditDevice = () => {
    dispatch(
      showModal(DeviceModalName, {
        data: device,
        onSubmit: refetch,
        onDelete: refetch,
      }),
    );
  };

  const handleCopyUGuid = () => {
    copyToClipboard(device.uGuid);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.device}>
        <div>
          <Typography variant="bodyBold" bottomOffset={4}>
            {device.name}
          </Typography>
          <Typography
            variant="description"
            color="grey_200"
            onClick={handleCopyUGuid}
          >
            {device.uGuid} <Image image={CopySvg} cursor="pointer" size={16} />
          </Typography>
        </div>
        <Button variant="outline" color="blue_500" onClick={handleEditDevice}>
          <Image image={EditSvg} cursor="pointer" />
        </Button>
      </div>
    </div>
  );
}

export default memo(DeviceItem);
