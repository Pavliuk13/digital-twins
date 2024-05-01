import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';

import { useDeleteDeviceMutation } from '@@api/devices';
import { usePageContentContext } from '@@contexts/PageContentContext';

import Button from '@@components/ui/Button';
import Image from '@@components/ui/Image';
import Typography from '@@components/ui/Typography';
import Card from '@@components/common/Card';

import EditSvg from '@@assets/icons/edit.svg';
import TrashSvg from '@@assets/icons/trash.svg';
import CopySvg from '@@assets/icons/copy.svg';

import { copyToClipboard } from '@@utils/common/copyToClipboard';

import { Device } from '@@types/device';

import { ConfirmDeleteModalName, DeviceModalName } from '@@constants/modal';
import { HARDWARE_IMAGE } from '@@constants/hardware';
import { ROUTES } from '@@constants/routes';

import styles from './DeviceCard.module.scss';

interface DeviceCardProps {
  device: Device;
}

function DeviceCard(props: DeviceCardProps) {
  const { device } = props;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { refetch } = usePageContentContext();

  const [deleteDevice] = useDeleteDeviceMutation();

  const handleEditDevice = (e) => {
    e.stopPropagation();

    dispatch(
      showModal(DeviceModalName, {
        data: device,
        onSubmit: refetch,
      }),
    );
  };

  const handleDeleteDevice = (e) => {
    e.stopPropagation();

    dispatch(
      showModal(ConfirmDeleteModalName, {
        title: 'Delete device?',
        description:
          'This operation is not reversible, are sure you want to delete the device?',
        onConfirm: async () => {
          await deleteDevice({ params: { deviceId: device.id } });

          refetch();

          toast.success('Device successfully deleted');
        },
      }),
    );
  };

  const handleCopyUGuid = (e) => {
    e.stopPropagation();

    copyToClipboard(device.uGuid);
  };

  const handleDeviceClick = () => {
    navigate(`${ROUTES.DEVICES}/${device.id}`);
  };

  return (
    <Card cursor="pointer" onClick={handleDeviceClick}>
      <img
        src={HARDWARE_IMAGE[device.template.hardware]}
        alt="Hardware"
        className={styles.image}
      />
      <div className={styles.actions}>
        <Button variant="outline" color="blue_500" onClick={handleEditDevice}>
          <Image image={EditSvg} cursor="pointer" />
        </Button>
        <Button variant="outline" color="red_500" onClick={handleDeleteDevice}>
          <Image image={TrashSvg} cursor="pointer" />
        </Button>
      </div>
      <div className={styles.info}>
        <Typography variant="bodyBold" bottomOffset={4}>
          {device.name}
        </Typography>
        <Typography variant="note" onClick={handleCopyUGuid}>
          {device.uGuid} <Image image={CopySvg} cursor="pointer" size={16} />
        </Typography>
      </div>
      <Typography variant="description">
        created by {device.user.email}
      </Typography>
    </Card>
  );
}

export default memo(DeviceCard);
