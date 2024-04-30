import { memo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Typography from '@@components/ui/Typography';

import { ROUTES } from '@@constants/routes';

import SignUpForm from './SignUpForm';

import { getDefaultFormState } from './SignUpForm/configs';
import { schema } from './SignUpForm/schema';

import styles from './Page.module.scss';

function Page() {
  const formProps = useForm({
    defaultValues: getDefaultFormState(),
    resolver: yupResolver(schema),
  });

  return (
    <div className={styles.wrapper}>
      <Typography variant="h1">Sign up</Typography>
      <Typography variant="subheading2" bottomOffset={24}>
        Register and manage your devices!
      </Typography>
      <FormProvider {...formProps}>
        <SignUpForm />
      </FormProvider>
      <div className={styles.signIn}>
        You have an account? <Link to={ROUTES.SIGN_IN}>Sign in</Link>
      </div>
    </div>
  );
}

export default memo(Page);
