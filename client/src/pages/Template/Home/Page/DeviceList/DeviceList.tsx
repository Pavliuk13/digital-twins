import { memo } from 'react';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';
import { useEditPermission } from '@@hooks/permissions/useEditPermission';

import { usePageContentContext } from '@@contexts/PageContentContext';

import Button from '@@components/ui/Button';
import Image from '@@components/ui/Image';
import Typography from '@@components/ui/Typography';

import PlusSvg from '@@assets/icons/plus.svg';

import { Template } from '@@types/template';

import { DeviceModalName } from '@@constants/modal';

import DeviceItem from './DeviceItem';

import styles from './DeviceList.module.scss';

function DeviceList() {
  const { data: { id, devices, createdBy } = {}, refetch } =
    usePageContentContext<Template>();

  const dispatch = useDispatch();

  const canEdit = useEditPermission(createdBy);

  const handleAddDevice = () => {
    dispatch(
      showModal(DeviceModalName, {
        templateId: id,
        onSubmit: () => {
          refetch();
        },
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Typography variant="subheading2">
          Devices <span className={styles.count}>{devices?.length || 0}</span>
        </Typography>
        {canEdit && (
          <Button
            variant="outline"
            color="grey_200"
            size="small"
            onClick={handleAddDevice}
          >
            <Image
              image={PlusSvg}
              size={12}
              fill="grey_200"
              position="left_8"
              cursor="pointer"
            />
            New device
          </Button>
        )}
      </div>
      <div className={styles.list}>
        {devices?.map((device) => {
          return <DeviceItem key={device.uGuid} device={device} />;
        })}
      </div>
    </div>
  );
}

export default memo(DeviceList);
