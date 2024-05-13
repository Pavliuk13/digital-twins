import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from '@@features/Modal';

import InviteMemberForm from './InviteMemberForm';

import { getDefaultFormState } from './configs';
import { schema } from './schema';

interface InviteMemberModalProps {
  onSubmit?: () => void;
}

function InviteMemberModal(props: InviteMemberModalProps) {
  const { onSubmit, ...modalProps } = props;

  const formProps = useMemo(() => {
    return {
      defaultValues: getDefaultFormState(),
      resolver: yupResolver(schema),
    };
  }, []);

  return (
    <Modal {...modalProps} position="right" formProps={formProps}>
      <InviteMemberForm onSubmit={onSubmit} />
    </Modal>
  );
}

export default InviteMemberModal;
