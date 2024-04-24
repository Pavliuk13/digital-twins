import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useCreateTemplateMutation } from '@@api/templates';

import ModalBody from '@@features/Modal/ModalBody';
import ModalFooter from '@@features/Modal/ModalFooter';
import ModalHeader from '@@features/Modal/ModalHeader';
import SubmitButton from '@@features/Modal/shared/SubmitButton';
import Typography from '@@components/ui/Typography';
import FormControl from '@@components/form/FormControl';
import InputController from '@@components/controllers/InputController';
import TextareaController from '@@components/controllers/TextareaController';

import HardwareSelect from './HardwareSelect';

import { preparePayload } from './utils';

import { FIELD_NAME } from '../constants';
import { useModalContext } from '@@contexts/ModalContext';

interface CreateTemplateFormProps {
  onSubmit?: () => void;
}

function CreateTemplateForm(props: CreateTemplateFormProps) {
  const { onSubmit } = props;

  const {
    formState: { errors, dirtyFields },
    handleSubmit,
    getValues,
  } = useFormContext();

  const { closeModal } = useModalContext();

  const [createTemplate, { isLoading }] = useCreateTemplateMutation();

  console.log({ form: getValues(), dirtyFields });

  const handleSubmitForm = async (formData) => {
    try {
      const data = await createTemplate({
        data: preparePayload(formData),
      }).unwrap();

      onSubmit?.(data);
    } catch (error) {
      return;
    }

    closeModal();
  };

  return (
    <>
      <ModalHeader>
        <Typography variant="subheading2">Create new template</Typography>
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
          disabled={isLoading}
          onClick={handleSubmit(handleSubmitForm)}
        >
          Create
        </SubmitButton>
      </ModalFooter>
    </>
  );
}

export default memo(CreateTemplateForm);
