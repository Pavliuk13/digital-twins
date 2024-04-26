import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from '@@features/Modal';

import { Template } from '@@types/template';

import TemplateForm from './TemplateForm';

import { getDefaultFormState } from './configs';
import { schema } from './schema';

interface TemplateModalProps {
  data?: Template;
  onSubmit?: () => void;
  onDelete?: () => void;
}

function TemplateModal(props: TemplateModalProps) {
  const { data, onSubmit, onDelete, ...modalProps } = props;

  const formProps = useMemo(() => {
    return {
      defaultValues: getDefaultFormState(data),
      resolver: yupResolver(schema),
    };
  }, []);

  return (
    <Modal {...modalProps} position="right" formProps={formProps}>
      <TemplateForm data={data} onSubmit={onSubmit} onDelete={onDelete} />
    </Modal>
  );
}

export default TemplateModal;
