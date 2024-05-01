import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { doPasswordChange } from '@@api/auth';

import FormControl from '@@components/form/FormControl';
import InputController from '@@components/controllers/InputController';
import Button from '@@components/ui/Button';

import { FIELD_NAMES } from './constants';

import styles from './PasswordChangeForm.module.scss';

function PasswordChangeForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormContext();

  const handleSubmitForm = async (formData) => {
    try {
      const { newPassword } = formData;

      await doPasswordChange(newPassword);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className={styles.wrapper}>
      <FormControl
        name={FIELD_NAMES.NEW_PASSWORD}
        errors={errors}
        labelProps={{
          label: 'New password',
          htmlFor: FIELD_NAMES.NEW_PASSWORD,
          isRequired: true,
        }}
        isFullWidth
      >
        <InputController name={FIELD_NAMES.NEW_PASSWORD} type="password" />
      </FormControl>
      <FormControl
        name={FIELD_NAMES.REPEAT_NEW_PASSWORD}
        errors={errors}
        labelProps={{
          label: 'Repeat new password',
          htmlFor: FIELD_NAMES.REPEAT_NEW_PASSWORD,
          isRequired: true,
        }}
        isFullWidth
      >
        <InputController
          name={FIELD_NAMES.REPEAT_NEW_PASSWORD}
          type="password"
        />
      </FormControl>
      <Button
        variant="primary"
        type="submit"
        size="medium"
        disabled={isSubmitting}
        onClick={handleSubmit(handleSubmitForm)}
        className={styles.submit}
      >
        Save
      </Button>
    </div>
  );
}

export default memo(PasswordChangeForm);
