import { memo } from 'react';

import PublicPageLayout from '@@components/layouts/PublicPageLayout';

import Page from './Page';

function AcceptInvitation() {
  return (
    <PublicPageLayout dataCid="acceptInvitation">
      <Page />
    </PublicPageLayout>
  );
}

export default memo(AcceptInvitation);
