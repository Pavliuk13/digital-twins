import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from '@@features/Modal';

import { Template } from '@@types/template';
import { Widget } from '@@types/widget';

import WidgetForm from './WidgetForm';

import { getDefaultFormState } from './configs';
import { schema } from './schema';

interface WidgetModalProps {
  data?: Template;
  templateId: Template['id'];
  widgetType: Widget['type'];
  onSubmit?: () => void;
  onDelete?: () => void;
}

function WidgetModal(props: WidgetModalProps) {
  const { data, templateId, widgetType, onSubmit, onDelete, ...modalProps } =
    props;

  const formProps = useMemo(() => {
    return {
      defaultValues: getDefaultFormState(data),
      resolver: yupResolver(schema),
    };
  }, []);

  return (
    <Modal {...modalProps} position="right" formProps={formProps}>
      <WidgetForm
        data={data}
        templateId={templateId}
        type={widgetType}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Modal>
  );
}

export default WidgetModal;
