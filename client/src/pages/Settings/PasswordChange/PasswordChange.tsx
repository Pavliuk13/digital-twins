import { memo } from 'react';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';

import Page from './Page';

import { usePageTabs } from '../hooks';

function PasswordChange() {
  const tabs = usePageTabs();

  return (
    <PrivatePageLayout dataCid="passwordChange">
      <PageContentLayout title="Password" tabs={tabs}>
        <Page />
      </PageContentLayout>
    </PrivatePageLayout>
  );
}

export default memo(PasswordChange);
