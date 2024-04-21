import { memo } from 'react';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import Header from '@@components/sections/Header/Header';

import Page from './Page';

function Locations() {
  return (
    <PrivatePageLayout dataCid="locations">
      <Header title="Locations" />
      <Page />
    </PrivatePageLayout>
  );
}

export default memo(Locations);
