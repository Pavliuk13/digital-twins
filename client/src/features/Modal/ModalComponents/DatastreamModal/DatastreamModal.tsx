import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from '@@features/Modal';

import { Template } from '@@types/template';

import DatastreamForm from './DatastreamForm';

import { getDefaultFormState } from './configs';
import { schema } from './schema';

interface DatastreamModalProps {
  data?: Template;
  templateId?: Template['id'];
  onSubmit?: () => void;
  onDelete?: () => void;
}

function DatastreamModal(props: DatastreamModalProps) {
  const { data, templateId, onSubmit, onDelete, ...modalProps } = props;

  const formProps = useMemo(() => {
    return {
      defaultValues: getDefaultFormState(data, { templateId }),
      resolver: yupResolver(schema),
    };
  }, []);

  return (
    <Modal {...modalProps} position="right" formProps={formProps}>
      <DatastreamForm
        data={data}
        templateId={templateId}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Modal>
  );
}

export default DatastreamModal;
