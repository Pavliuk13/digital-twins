import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import FormControl from '@@components/form/FormControl';
import InputController from '@@components/controllers/InputController';
import Button from '@@components/ui/Button';

import { setUser } from '@@store/user/slice';
import { useDispatch } from '@@store/index';
import { useUpdateUserMutation } from '@@api/user';

import { FIELD_NAMES } from './constants';

import styles from './UserProfileForm.module.scss';

function UserProfileForm() {
  const dispatch = useDispatch();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormContext();

  const [updateUser] = useUpdateUserMutation();

  const handleSubmitForm = async (formData) => {
    try {
      const { name } = formData;
      const { data: updatedUser } = await updateUser({ data: { name } });
      dispatch(setUser(updatedUser));
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
        <InputController name={FIELD_NAMES.NAME} />
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
