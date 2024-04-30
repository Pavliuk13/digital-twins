import { memo } from 'react';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';

import Page from './Page';

import { usePageTabs } from '../hooks';

function UserProfile() {
  const tabs = usePageTabs();

  return (
    <PrivatePageLayout dataCid="userProfile">
      <PageContentLayout title="Profile" tabs={tabs}>
        <Page />
      </PageContentLayout>
    </PrivatePageLayout>
  );
}

export default memo(UserProfile);
