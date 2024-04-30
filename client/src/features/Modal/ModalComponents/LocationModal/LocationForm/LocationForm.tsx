import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} from '@@api/locations';
import { useModalContext } from '@@contexts/ModalContext';

import ModalBody from '@@features/Modal/ModalBody';
import ModalFooter from '@@features/Modal/ModalFooter';
import ModalHeader from '@@features/Modal/ModalHeader';
import SubmitButton from '@@features/Modal/shared/SubmitButton';
import DeleteButton from '@@features/Modal/shared/DeleteButton';
import Typography from '@@components/ui/Typography';
import FormControl from '@@components/form/FormControl';
import InputController from '@@components/controllers/InputController';

import { Location } from '@@types/locations';

import { prepareCreatePayload, prepareUpdatePayload } from './utils';

import { FIELD_NAME } from '../constants';

interface LocationFormProps {
  data?: Location;
  onSubmit?: () => void;
  onDelete?: () => void;
}

function LocationForm(props: LocationFormProps) {
  const { data, onSubmit, onDelete } = props;

  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const { closeModal } = useModalContext();

  const [createLocation, { isLoading: isCreateLoading }] =
    useCreateLocationMutation();
  const [updateLocation, { isLoading: isUpdateLoading }] =
    useUpdateLocationMutation();
  const [deleteLocation, { isLoading: isDeleteLoading }] =
    useDeleteLocationMutation();

  const handleSubmitForm = async (formData) => {
    try {
      if (data?.id) {
        const updatedLocationData = await updateLocation({
          data: prepareUpdatePayload(formData),
        }).unwrap();

        onSubmit?.(updatedLocationData);
      } else {
        const createdLocationData = await createLocation({
          data: prepareCreatePayload(formData),
        }).unwrap();

        onSubmit?.(createdLocationData);
      }
    } catch (error) {
      return;
    }

    closeModal();
  };

  const handleDeleteTemplate = async () => {
    try {
      await deleteLocation({ params: { locationId: data.id } }).unwrap();

      onDelete?.();
    } catch (error) {
      return;
    }

    toast.success('Location successfully deleted');

    closeModal();
  };

  return (
    <>
      <ModalHeader>
        <Typography variant="subheading2">
          {data?.id ? data.name : 'Create new location'}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <FormControl
          name={FIELD_NAME.NAME}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.NAME,
            label: 'Name',
            isRequired: true,
          }}
        >
          <InputController name={FIELD_NAME.NAME} />
        </FormControl>
        <FormControl
          name={FIELD_NAME.ADDRESS}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.ADDRESS,
            label: 'Address',
            isRequired: true,
          }}
        >
          <InputController name={FIELD_NAME.ADDRESS} />
        </FormControl>
        <FormControl
          name={FIELD_NAME.ZIP}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.ZIP,
            label: 'Zip',
            isRequired: true,
          }}
        >
          <InputController name={FIELD_NAME.ZIP} />
        </FormControl>
        <FormControl
          name={FIELD_NAME.STATE}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.STATE,
            label: 'State',
            isRequired: true,
          }}
        >
          <InputController name={FIELD_NAME.STATE} />
        </FormControl>
        <FormControl
          name={FIELD_NAME.CITY}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.CITY,
            label: 'City',
            isRequired: true,
          }}
        >
          <InputController name={FIELD_NAME.CITY} />
        </FormControl>
        <FormControl
          name={FIELD_NAME.COUNTRY}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.COUNTRY,
            label: 'Country',
            isRequired: true,
          }}
        >
          <InputController name={FIELD_NAME.COUNTRY} />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <SubmitButton
          disabled={isCreateLoading || isUpdateLoading || isDeleteLoading}
          onClick={handleSubmit(handleSubmitForm)}
        >
          {data?.id ? 'Update' : 'Create'}
        </SubmitButton>
        {!!data?.id && (
          <DeleteButton
            disabled={isDeleteLoading}
            confirmProps={{
              title: 'Delete location?',
              description:
                'This operation is not reversible, are sure you want to delete the location?',
              onConfirm: handleDeleteTemplate,
            }}
          />
        )}
      </ModalFooter>
    </>
  );
}

export default memo(LocationForm);
