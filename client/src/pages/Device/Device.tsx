import { memo, useMemo } from 'react';

import { PageContentContextProvider } from '@@contexts/PageContentContext';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';

import Page from './Page';

import { useDevice } from './hooks';

function Device() {
  const { device, isLoading, refetch } = useDevice();

  console.log({ device });

  const pageContentContext = useMemo(() => {
    return {
      data: device,
      isLoading,
      refetch,
    };
  }, [device, isLoading]);

  return (
    <PrivatePageLayout dataCid="device">
      <PageContentLayout
        title={`Device - ${device?.name} | ${device?.template.name}`}
        withBackward
        isLoading={isLoading}
      >
        <PageContentContextProvider value={pageContentContext}>
          <Page />
        </PageContentContextProvider>
      </PageContentLayout>
    </PrivatePageLayout>
  );
}

export default memo(Device);
