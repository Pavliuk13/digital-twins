import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from '@@features/Modal';

import CreateTemplateForm from './CreateTemplateForm';

import { getDefaultFormState } from './configs';
import { schema } from './schema';

interface CreateTemplateModalProps {
  onSubmit?: () => void;
}

function CreateTemplateModal(props: CreateTemplateModalProps) {
  const { onSubmit, ...modalProps } = props;

  const formProps = useMemo(() => {
    return {
      defaultValues: getDefaultFormState(),
      resolver: yupResolver(schema),
    };
  }, []);

  return (
    <Modal {...modalProps} position="right" formProps={formProps}>
      <CreateTemplateForm onSubmit={onSubmit} />
    </Modal>
  );
}

export default CreateTemplateModal;
