import { memo } from 'react';

import PublicPageLayout from '@@components/layouts/PublicPageLayout';

import Page from './Page';

function SignUp() {
  return (
    <PublicPageLayout dataCid="signUp">
      <Page />
    </PublicPageLayout>
  );
}

export default memo(SignUp);
