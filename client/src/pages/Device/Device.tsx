import { memo, useMemo } from 'react';

import { PageContentContextProvider } from '@@contexts/PageContentContext';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';

import Page from './Page';

import { useDevice } from './hooks';

function Device() {
  const { data, isLoading, refetch } = useDevice();

  const pageContentContext = useMemo(() => {
    return {
      data,
      isLoading,
      refetch,
    };
  }, [data, isLoading]);

  return (
    <PrivatePageLayout dataCid="device">
      <PageContentLayout
        title={`Device - ${data.device?.name} | ${data.device?.template.name}`}
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
