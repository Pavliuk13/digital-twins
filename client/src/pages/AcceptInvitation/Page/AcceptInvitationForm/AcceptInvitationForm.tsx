import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { doCreateUserWithEmailAndPassword } from '@@api/auth';
import {
  useAcceptInviteMutation,
  useGetUserByInvitationCodeQuery,
} from '@@api/user';

import FormControl from '@@components/form/FormControl';
import InputController from '@@components/controllers/InputController';
import Button from '@@components/ui/Button';

import { getDefaultFormState } from './configs';

import { FIELD_NAMES } from './constants';

import styles from './AcceptInvitationForm.module.scss';

function AcceptInvitationForm() {
  const { search } = useLocation();

  const invitationCode = new URLSearchParams(search).get('invitationCode');

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useFormContext();

  const { data } = useGetUserByInvitationCodeQuery({
    params: { invitationCode },
  });

  const [acceptInvite] = useAcceptInviteMutation();

  const handleSubmitForm = async (formData) => {
    try {
      const { email, name, password } = formData;

      await doCreateUserWithEmailAndPassword(email, password);

      await acceptInvite({ data: { name, invitationCode } });
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  useEffect(() => {
    if (data) {
      reset(getDefaultFormState(data));
    }
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <FormControl
        name={FIELD_NAMES.EMAIL}
        errors={errors}
        labelProps={{
          label: 'Email',
          htmlFor: FIELD_NAMES.EMAIL,
          isRequired: true,
        }}
        isFullWidth
      >
        <InputController
          id={FIELD_NAMES.EMAIL}
          name={FIELD_NAMES.EMAIL}
          disabled
        />
      </FormControl>
      <FormControl
        name={FIELD_NAMES.NAME}
        errors={errors}
        labelProps={{
          label: 'Name',
          htmlFor: FIELD_NAMES.NAME,
          isRequired: true,
        }}
        isFullWidth
      >
        <InputController id={FIELD_NAMES.NAME} name={FIELD_NAMES.NAME} />
      </FormControl>
      <FormControl
        name={FIELD_NAMES.PASSWORD}
        errors={errors}
        labelProps={{
          label: 'Password',
          htmlFor: FIELD_NAMES.PASSWORD,
          isRequired: true,
        }}
        isFullWidth
      >
        <InputController
          id={FIELD_NAMES.PASSWORD}
          name={FIELD_NAMES.PASSWORD}
          type="password"
        />
      </FormControl>
      <Button
        variant="primary"
        type="submit"
        size="medium"
        fullWidth
        disabled={isSubmitting}
        onClick={handleSubmit(handleSubmitForm)}
        className={styles.submit}
      >
        Accept invitation
      </Button>
    </div>
  );
}

export default memo(AcceptInvitationForm);
