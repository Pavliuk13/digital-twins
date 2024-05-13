import { memo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Typography from '@@components/ui/Typography';

import AcceptInvitationForm from './AcceptInvitationForm';

import { getDefaultFormState } from './AcceptInvitationForm/configs';
import { schema } from './AcceptInvitationForm/schema';

import styles from './Page.module.scss';

function Page() {
  const formProps = useForm({
    defaultValues: getDefaultFormState(),
    resolver: yupResolver(schema),
  });

  return (
    <div className={styles.wrapper}>
      <Typography variant="h1">Accept invitation</Typography>
      <Typography variant="subheading2" bottomOffset={24}>
        Complete the registration by invitation and become a member of the team!
      </Typography>
      <FormProvider {...formProps}>
        <AcceptInvitationForm />
      </FormProvider>
    </div>
  );
}

export default memo(Page);
