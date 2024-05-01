import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '@@api/auth';

import FormControl from '@@components/form/FormControl';
import InputController from '@@components/controllers/InputController';
import Button from '@@components/ui/Button';
import Image from '@@components/ui/Image';

import GoogleLogoSvg from '@@assets/icons/google_logo.svg';

import { FIELD_NAMES } from './constants';

import styles from './SignInForm.module.scss';

function SignInForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormContext();

  const handleGoogleSign = async () => {
    try {
      await doSignInWithGoogle();
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      const { email, password } = formData;

      await doSignInWithEmailAndPassword(email, password);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

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
        <InputController id={FIELD_NAMES.EMAIL} name={FIELD_NAMES.EMAIL} />
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
        Login
      </Button>
      <Button
        variant="outline"
        size="medium"
        color="grey_200"
        fullWidth
        disabled={isSubmitting}
        onClick={handleGoogleSign}
        className={styles.submit}
      >
        <Image
          image={GoogleLogoSvg}
          size={16}
          fill="grey_200"
          position="left_8"
          cursor="pointer"
        />
        Sign in with Google
      </Button>
    </div>
  );
}

export default memo(SignInForm);
