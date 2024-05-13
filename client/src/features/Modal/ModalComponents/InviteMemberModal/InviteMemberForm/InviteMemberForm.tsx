import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useInviteUserMutation } from '@@api/user';
import { useModalContext } from '@@contexts/ModalContext';

import ModalBody from '@@features/Modal/ModalBody';
import ModalFooter from '@@features/Modal/ModalFooter';
import ModalHeader from '@@features/Modal/ModalHeader';
import SubmitButton from '@@features/Modal/shared/SubmitButton';
import Typography from '@@components/ui/Typography';
import FormControl from '@@components/form/FormControl';
import InputController from '@@components/controllers/InputController';

import { FIELD_NAME } from '../constants';

interface InviteMemberFormProps {
  onSubmit?: () => void;
}

function InviteMemberForm(props: InviteMemberFormProps) {
  const { onSubmit } = props;

  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const { closeModal } = useModalContext();

  const [inviteUser, { isLoading }] = useInviteUserMutation();

  const handleSubmitForm = async (formData) => {
    try {
      const invitedUserData = await inviteUser({
        data: formData,
      }).unwrap();

      onSubmit?.(invitedUserData);
    } catch (error) {
      return;
    }

    toast.success('Invitation successfully sent');

    closeModal();
  };

  return (
    <>
      <ModalHeader>
        <Typography variant="subheading2">Invite new member</Typography>
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
          name={FIELD_NAME.EMAIL}
          errors={errors}
          labelProps={{
            htmlFor: FIELD_NAME.EMAIL,
            label: 'Email',
            isRequired: true,
          }}
        >
          <InputController name={FIELD_NAME.EMAIL} />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <SubmitButton
          disabled={isLoading}
          onClick={handleSubmit(handleSubmitForm)}
        >
          Send invite
        </SubmitButton>
      </ModalFooter>
    </>
  );
}

export default memo(InviteMemberForm);
