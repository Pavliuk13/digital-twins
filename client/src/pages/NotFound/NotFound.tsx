import { memo } from 'react';

import PageLayout from '@@components/layouts/PrivatePageLayout';

import Page from './Page';

function NotFound() {
  return (
    <PageLayout dataCid="notFound">
      <Page />
    </PageLayout>
  );
}

export default memo(NotFound);
