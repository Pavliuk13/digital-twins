import { memo, useMemo } from 'react';

import { PageContentContextProvider } from '@@contexts/PageContentContext';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';
import Header from '@@components/sections/Header';

import Page from './Page';

import { useMembers } from './hooks';

function Members() {
  const { members, isLoading, refetch } = useMembers();

  const pageContentContextValue = useMemo(() => {
    return {
      data: members,
      isLoading,
      refetch,
    };
  }, [members, isLoading]);

  return (
    <PrivatePageLayout dataCid="members">
      <Header title="Members" />
      <PageContentLayout
        title="Members"
        description="Invite new member"
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
