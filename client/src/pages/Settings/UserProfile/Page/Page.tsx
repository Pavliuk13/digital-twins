import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { selectUser } from '@@store/user/selectors';

import UserProfileForm from './UserProfileForm';

import { getDefaultFormState } from './UserProfileForm/configs';
import { schema } from './UserProfileForm/schema';

import styles from './Page.module.scss';

function Page() {
  const { user } = useSelector(selectUser);

  const formProps = useForm({
    defaultValues: getDefaultFormState(user),
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
