import { memo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import PasswordChangeForm from './PasswordChangeForm';

import { getDefaultFormState } from './PasswordChangeForm/configs';
import { schema } from './PasswordChangeForm/schema';

import styles from './Page.module.scss';

function Page() {
  const formProps = useForm({
    defaultValues: getDefaultFormState(),
    resolver: yupResolver(schema),
  });

  return (
    <div className={styles.wrapper}>
      <FormProvider {...formProps}>
        <PasswordChangeForm />
      </FormProvider>
    </div>
  );
}

export default memo(Page);
