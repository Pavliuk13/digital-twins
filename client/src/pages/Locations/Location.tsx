import { memo } from 'react';

import PageLayout from '@@components/layouts/PageLayout';

import Page from './Page';

function Locations() {
  return (
    <PageLayout dataCid="locations">
      <Page />
    </PageLayout>
  );
}

export default memo(Locations);
