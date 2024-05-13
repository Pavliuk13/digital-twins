import { memo, useMemo } from 'react';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';
import { useEditPermission } from '@@hooks/permissions/useEditPermission';

import { PageContentContextProvider } from '@@contexts/PageContentContext';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';
import Header from '@@components/sections/Header';

import { InviteMemberModalName } from '@@constants/modal';

import Page from './Page';

import { useMembers } from './hooks';

function Members() {
  const { members, isLoading, refetch } = useMembers();

  const dispatch = useDispatch();

  const canEdit = useEditPermission();

  const pageContentContextValue = useMemo(() => {
    return {
      data: members,
      isLoading,
      refetch,
    };
  }, [members, isLoading]);

  const handleInviteMember = () => {
    dispatch(
      showModal(InviteMemberModalName, {
        onSubmit: refetch,
      }),
    );
  };

  return (
    <PrivatePageLayout dataCid="members">
      <Header title="Members" />
      <PageContentLayout
        title="Members"
        description="Invite new member"
        {...(canEdit && {
          button: {
            text: 'Invite member',
            onClick: handleInviteMember,
          },
        })}
        isLoading={isLoading}
      >
        <PageContentContextProvider value={pageContentContextValue}>
          <Page />
        </PageContentContextProvider>
      </PageContentLayout>
    </PrivatePageLayout>
  );
}

export default memo(Members);
