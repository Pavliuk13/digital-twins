import { memo } from 'react';
import toast from 'react-hot-toast';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';
import { useEditPermission } from '@@hooks/permissions/useEditPermission';

import { useDeleteLocationMutation } from '@@api/locations';
import { usePageContentContext } from '@@contexts/PageContentContext';

import Button from '@@components/ui/Button';
import Image from '@@components/ui/Image';
import Typography from '@@components/ui/Typography';
import Card from '@@components/common/Card';

import EditSvg from '@@assets/icons/edit.svg';
import TrashSvg from '@@assets/icons/trash.svg';

import { Location } from '@@types/locations';

import { ConfirmDeleteModalName, LocationModalName } from '@@constants/modal';

import styles from './LocationCard.module.scss';

interface LocationCardProps {
  location: Location;
}

function LocationCard(props: LocationCardProps) {
  const { location } = props;

  const dispatch = useDispatch();

  const { refetch } = usePageContentContext();

  const canEdit = useEditPermission(location.createdBy);

  const [deleteLocation] = useDeleteLocationMutation();

  const handleEditLocation = () => {
    dispatch(
      showModal(LocationModalName, {
        data: location,
        onSubmit: refetch,
      }),
    );
  };

  const handleLocationDevice = () => {
    dispatch(
      showModal(ConfirmDeleteModalName, {
        title: 'Delete location?',
        description:
          'This operation is not reversible, are sure you want to delete the location?',
        onConfirm: async () => {
          await deleteLocation({ params: { locationId: location.id } });

          refetch();

          toast.success('Location successfully deleted');
        },
      }),
    );
  };

  return (
    <Card cursor="pointer" className={styles.wrapper}>
      <div className={styles.info}>
        <Typography variant="bodyBold" bottomOffset={4}>
          {location.name} ({location.id})
        </Typography>
      </div>
      <Typography variant="note">
        {location.city}, {location.state}, {location.country}
      </Typography>
      <Typography variant="note">
        created by {location.owner.name} ({location.owner.email})
      </Typography>
      {canEdit && (
        <div className={styles.actions}>
          <Button
            variant="outline"
            color="blue_500"
            onClick={handleEditLocation}
          >
            <Image image={EditSvg} cursor="pointer" />
          </Button>
          <Button
            variant="outline"
            color="red_500"
            onClick={handleLocationDevice}
          >
            <Image image={TrashSvg} cursor="pointer" />
          </Button>
        </div>
      )}
    </Card>
  );
}

export default memo(LocationCard);
