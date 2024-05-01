import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  useAssignWidgetMutation,
  useUpdateWidgetMutation,
  useDeleteWidgetMutation,
} from '@@api/widgets';
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
import { Widget } from '@@types/widget';

import DatastreamSelect from './DatastreamSelect';

import { prepareUpdatePayload } from './utils';

import { FIELD_NAME } from '../constants';

interface WidgetFormProps {
  data?: Widget;
  templateId: Template['id'];
  type: Widget['type'];
  onSubmit?: () => void;
  onDelete?: () => void;
}

function WidgetForm(props: WidgetFormProps) {
  const { data, templateId, type, onSubmit, onDelete } = props;

  const {
    formState: { errors },
    handleSubmit,
    getValues,
  } = useFormContext();

  const { closeModal } = useModalContext();

  const [assignWidget, { isLoading: isAssignLoading }] =
    useAssignWidgetMutation();
  const [updateWidget, { isLoading: isUpdateLoading }] =
    useUpdateWidgetMutation();
  const [deleteWidget, { isLoading: isDeleteLoading }] =
    useDeleteWidgetMutation();

  const handleSubmitForm = async (formData) => {
    try {
      if (data?.id) {
        const updatedWidgetmData = await updateWidget({
          data: prepareUpdatePayload(formData),
        }).unwrap();

        onSubmit?.(updatedWidgetmData);
      } else {
        const createdWidgetData = await assignWidget({
          data: { templateId, type, ...formData },
        }).unwrap();

        onSubmit?.(createdWidgetData);
      }
    } catch (error) {
      return;
    }

    closeModal();
  };

  const handleDeleteWidget = async () => {
    try {
      await deleteWidget({ params: { widgetId: data.id } }).unwrap();

      onDelete?.();
    } catch (error) {
      return;
    }

    toast.success('Widget successfully deleted');

    closeModal();
  };

  return (
    <>
      <ModalHeader>
        <Typography variant="subheading2">
          {data?.id
            ? `Edit ${data.title} widget`
            : 'Assign a widget to all devices in a template'}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <FormControl
          name={FIELD_NAME.TITLE}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.TITLE,
            label: 'Title',
            isRequired: true,
          }}
        >
          <InputController name={FIELD_NAME.TITLE} />
        </FormControl>
        <FormControl
          name={FIELD_NAME.DATASTREAM_ID}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.DATASTREAM_ID,
            label: 'Datastream',
            isRequired: true,
          }}
          description="Select a datastream to send data"
        >
          <DatastreamSelect
            name={FIELD_NAME.DATASTREAM_ID}
            templateId={templateId}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <SubmitButton
          disabled={isAssignLoading || isUpdateLoading || isDeleteLoading}
          onClick={handleSubmit(handleSubmitForm)}
        >
          {data?.id ? 'Save' : 'Assign'}
        </SubmitButton>
        {!!data?.id && (
          <DeleteButton
            disabled={isDeleteLoading}
            confirmProps={{
              title: 'Delete widget?',
              description:
                'This operation is not reversible, are sure you want to delete the widget?',
              onConfirm: handleDeleteWidget,
            }}
          />
        )}
      </ModalFooter>
    </>
  );
}

export default memo(WidgetForm);
