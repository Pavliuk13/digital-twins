import { memo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import UserProfileForm from './UserProfileForm';

import { getDefaultFormState } from './UserProfileForm/configs';
import { schema } from './UserProfileForm/schema';

import styles from './Page.module.scss';

function Page() {
  const formProps = useForm({
    defaultValues: getDefaultFormState(),
    resolver: yupResolver(schema),
  });

  return (
    <div className={styles.wrapper}>
      <FormProvider {...formProps}>
        <UserProfileForm />
      </FormProvider>
    </div>
  );
}

export default memo(Page);
