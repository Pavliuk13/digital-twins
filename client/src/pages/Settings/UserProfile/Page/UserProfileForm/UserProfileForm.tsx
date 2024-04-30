import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import FormControl from '@@components/form/FormControl';
import InputController from '@@components/controllers/InputController';
import Button from '@@components/ui/Button';

import { FIELD_NAMES } from './constants';

import styles from './UserProfileForm.module.scss';

function UserProfileForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormContext();

  const handleSubmitForm = async (formData) => {
    try {
      // const { email, password } = formData;
      // await doCreateUserWithEmailAndPassword(email, password);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className={styles.wrapper}>
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
        <InputController name={FIELD_NAMES.NAME} type="password" />
      </FormControl>
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
        <InputController name={FIELD_NAMES.EMAIL} disabled />
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

export default memo(UserProfileForm);
