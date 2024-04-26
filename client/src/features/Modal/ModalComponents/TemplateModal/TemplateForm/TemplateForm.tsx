import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} from '@@api/templates';
import { useModalContext } from '@@contexts/ModalContext';

import ModalBody from '@@features/Modal/ModalBody';
import ModalFooter from '@@features/Modal/ModalFooter';
import ModalHeader from '@@features/Modal/ModalHeader';
import SubmitButton from '@@features/Modal/shared/SubmitButton';
import DeleteButton from '@@features/Modal/shared/DeleteButton';
import Typography from '@@components/ui/Typography';
import FormControl from '@@components/form/FormControl';
import InputController from '@@components/controllers/InputController';
import TextareaController from '@@components/controllers/TextareaController';

import { Template } from '@@types/template';

import HardwareSelect from './HardwareSelect';

import { prepareCreatePayload, prepareUpdatePayload } from './utils';

import { FIELD_NAME } from '../constants';

interface TemplateFormProps {
  data?: Template;
  onSubmit?: () => void;
  onDelete?: () => void;
}

function TemplateForm(props: TemplateFormProps) {
  const { data, onSubmit, onDelete } = props;

  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const { closeModal } = useModalContext();

  const [createTemplate, { isLoading: isCreateLoading }] =
    useCreateTemplateMutation();
  const [updateTemplate, { isLoading: isUpdateLoading }] =
    useUpdateTemplateMutation();
  const [deleteTemplate, { isLoading: isDeleteLoading }] =
    useDeleteTemplateMutation();

  const handleSubmitForm = async (formData) => {
    try {
      if (data?.id) {
        const updatedDeviceData = await updateTemplate({
          data: prepareUpdatePayload(formData),
        }).unwrap();

        onSubmit?.(updatedDeviceData);
      } else {
        const createdTemplateData = await createTemplate({
          data: prepareCreatePayload(formData),
        }).unwrap();

        onSubmit?.(createdTemplateData);
      }
    } catch (error) {
      return;
    }

    closeModal();
  };

  const handleDeleteTemplate = async () => {
    try {
      await deleteTemplate({ params: { templateId: data.id } }).unwrap();

      onDelete?.();
    } catch (error) {
      return;
    }

    toast.success('Template successfully deleted');

    closeModal();
  };

  return (
    <>
      <ModalHeader>
        <Typography variant="subheading2">
          {data?.id ? data.name : 'Create new template'}
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
          name={FIELD_NAME.HARDWARE}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.HARDWARE,
            label: 'Hardware',
            isRequired: true,
          }}
        >
          <HardwareSelect name={FIELD_NAME.HARDWARE} />
        </FormControl>
        <FormControl
          name={FIELD_NAME.CONNECTION_TYPE}
          errors={errors}
          description="Currently, the connection is only via Wi-Fi"
          labelProps={{
            htmlFor: FIELD_NAME.CONNECTION_TYPE,
            label: 'Connection type',
          }}
        >
          <InputController disabled name={FIELD_NAME.CONNECTION_TYPE} />
        </FormControl>
        <FormControl
          name={FIELD_NAME.DESCRIPTION}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.DESCRIPTION,
            label: 'Description',
          }}
        >
          <TextareaController name={FIELD_NAME.DESCRIPTION} />
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
              title: 'Delete template?',
              description:
                'This operation is not reversible, are sure you want to delete the template?',
              onConfirm: handleDeleteTemplate,
            }}
          />
        )}
      </ModalFooter>
    </>
  );
}

export default memo(TemplateForm);
