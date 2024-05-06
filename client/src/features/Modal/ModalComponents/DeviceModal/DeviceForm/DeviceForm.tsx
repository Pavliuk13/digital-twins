import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  useCreateDeviceMutation,
  useDeleteDeviceMutation,
  useUpdateDeviceMutation,
} from '@@api/devices';
import { useModalContext } from '@@contexts/ModalContext';

import ModalBody from '@@features/Modal/ModalBody';
import ModalFooter from '@@features/Modal/ModalFooter';
import ModalHeader from '@@features/Modal/ModalHeader';
import SubmitButton from '@@features/Modal/shared/SubmitButton';
import DeleteButton from '@@features/Modal/shared/DeleteButton';
import Typography from '@@components/ui/Typography';
import FormControl from '@@components/form/FormControl';
import InputController from '@@components/controllers/InputController';

import { Device } from '@@types/device';
import { Template } from '@@types/template';

import TemplateSelect from './TemplateSelect';

import { prepareCreatePayload, prepareUpdatePayload } from './utils';

import { FIELD_NAME } from '../constants';

interface DeviceFormProps {
  data?: Device;
  templateId?: Template['id'];
  onSubmit?: () => void;
  onDelete?: () => void;
}

function DeviceForm(props: DeviceFormProps) {
  const { data, templateId, onSubmit, onDelete } = props;

  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const { closeModal } = useModalContext();

  const [createDevice, { isLoading: isCreateLoading }] =
    useCreateDeviceMutation();
  const [updateDevice, { isLoading: isUpdateLoading }] =
    useUpdateDeviceMutation();
  const [deleteDevice, { isLoading: isDeleteLoading }] =
    useDeleteDeviceMutation();

  const handleSubmitForm = async (formData) => {
    try {
      if (data?.id) {
        const updatedDeviceData = await updateDevice({
          data: prepareUpdatePayload(formData),
        }).unwrap();

        onSubmit?.(updatedDeviceData);
      } else {
        const createdDeviceData = await createDevice({
          data: prepareCreatePayload(formData),
        }).unwrap();

        onSubmit?.(createdDeviceData);
      }
    } catch (error) {
      return;
    }

    closeModal();
  };

  const handleDeleteDevice = async () => {
    try {
      await deleteDevice({ params: { deviceId: data.id } }).unwrap();

      onDelete?.();
    } catch (error) {
      return;
    }

    toast.success('Device successfully deleted');

    closeModal();
  };

  return (
    <>
      <ModalHeader>
        <Typography variant="subheading2">
          {data?.id ? data.name : 'Create new device'}
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
          name={FIELD_NAME.AZURE_DIGITAL_TWIN_URL}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.AZURE_DIGITAL_TWIN_URL,
            label: 'Digital twin url',
          }}
        >
          <InputController name={FIELD_NAME.AZURE_DIGITAL_TWIN_URL} />
        </FormControl>
        <FormControl
          name={FIELD_NAME.TEMPLATE_ID}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.TEMPLATE_ID,
            label: 'Template',
            isRequired: true,
          }}
        >
          <TemplateSelect
            name={FIELD_NAME.TEMPLATE_ID}
            disabled={data?.id || templateId}
          />
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
              title: 'Delete device?',
              description:
                'This operation is not reversible, are sure you want to delete the device?',
              onConfirm: handleDeleteDevice,
            }}
          />
        )}
      </ModalFooter>
    </>
  );
}

export default memo(DeviceForm);
