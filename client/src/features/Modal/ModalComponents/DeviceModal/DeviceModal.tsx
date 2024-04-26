import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from '@@features/Modal';

import { Device } from '@@types/device';
import { Template } from '@@types/template';

import DeviceForm from './DeviceForm';

import { getDefaultFormState } from './configs';
import { schema } from './schema';

interface DeviceModalProps {
  data?: Device;
  templateId?: Template['id'];
  onSubmit?: () => void;
  onDelete?: () => void;
}

function DeviceModal(props: DeviceModalProps) {
  const { data, templateId, onSubmit, onDelete, ...modalProps } = props;

  const formProps = useMemo(() => {
    return {
      defaultValues: getDefaultFormState(data, { templateId }),
      resolver: yupResolver(schema),
    };
  }, []);

  return (
    <Modal {...modalProps} position="right" formProps={formProps}>
      <DeviceForm
        data={data}
        templateId={templateId}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Modal>
  );
}

export default DeviceModal;
