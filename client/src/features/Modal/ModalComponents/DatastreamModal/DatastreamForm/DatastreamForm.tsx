import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  useCreateDatastreamMutation,
  useUpdateDatastreamMutation,
  useDeleteDatastreamMutation,
} from '@@api/datastreams';
import { useModalContext } from '@@contexts/ModalContext';

import ModalBody from '@@features/Modal/ModalBody';
import ModalFooter from '@@features/Modal/ModalFooter';
import ModalHeader from '@@features/Modal/ModalHeader';
import SubmitButton from '@@features/Modal/shared/SubmitButton';
import DeleteButton from '@@features/Modal/shared/DeleteButton';
import Typography from '@@components/ui/Typography';
import FormControl from '@@components/form/FormControl';
import InputController from '@@components/controllers/InputController';

import { Template } from '@@types/template';

import PinSelect from './PinSelect';

import { prepareUpdatePayload } from './utils';

import { FIELD_NAME } from '../constants';

interface DatastreamFormProps {
  data?: Template;
  onSubmit?: () => void;
  onDelete?: () => void;
}

function DatastreamForm(props: DatastreamFormProps) {
  const { data, onSubmit, onDelete } = props;

  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const { closeModal } = useModalContext();

  const [createDatastream, { isLoading: isCreateLoading }] =
    useCreateDatastreamMutation();
  const [updateDatastream, { isLoading: isUpdateLoading }] =
    useUpdateDatastreamMutation();
  const [deleteDatastream, { isLoading: isDeleteLoading }] =
    useDeleteDatastreamMutation();

  const handleSubmitForm = async (formData) => {
    try {
      if (data?.id) {
        const updatedDatastreamData = await updateDatastream({
          data: prepareUpdatePayload(formData),
        }).unwrap();

        onSubmit?.(updatedDatastreamData);
      } else {
        const createdDatastreamData = await createDatastream({
          data: formData,
        }).unwrap();

        onSubmit?.(createdDatastreamData);
      }
    } catch (error) {
      return;
    }

    closeModal();
  };

  const handleDeleteTemplate = async () => {
    try {
      await deleteDatastream({ params: { datastreamId: data.id } }).unwrap();

      onDelete?.();
    } catch (error) {
      return;
    }

    toast.success('Datastream successfully deleted');

    closeModal();
  };

  return (
    <>
      <ModalHeader>
        <Typography variant="subheading2">
          {data?.id ? data.name : 'Create new datastream'}
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
          name={FIELD_NAME.ALIAS}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.ALIAS,
            label: 'Alias',
            isRequired: true,
          }}
        >
          <InputController name={FIELD_NAME.ALIAS} />
        </FormControl>
        <FormControl
          name={FIELD_NAME.PIN}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.PIN,
            label: 'Pin',
            isRequired: true,
          }}
          description="Select your device's pin that is set in the sketch/firmware and will get the data"
        >
          <PinSelect name={FIELD_NAME.PIN} />
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
              title: 'Delete datastream?',
              description:
                'Are you sure? This action can break widgets, automations, and other functionality that rely on this datastream.',
              onConfirm: handleDeleteTemplate,
            }}
          />
        )}
      </ModalFooter>
    </>
  );
}

export default memo(DatastreamForm);
