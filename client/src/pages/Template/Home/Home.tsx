import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { PageContentContextProvider } from '@@contexts/PageContentContext';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';

import Page from './Page';

import { usePageTabs, useTemplate } from '../hooks';

function Home() {
  const { templateId } = useParams();

  const tabs = usePageTabs(templateId);

  const { template, isLoading, refetch } = useTemplate();

  const pageContentContext = useMemo(() => {
    return {
      data: template,
      isLoading,
      refetch,
    };
  }, [template, isLoading]);

  return (
    <PrivatePageLayout dataCid="home">
      <PageContentLayout title={`Template - ${template?.name}`} tabs={tabs}>
        <PageContentContextProvider value={pageContentContext}>
          <Page />
        </PageContentContextProvider>
      </PageContentLayout>
    </PrivatePageLayout>
  );
}

export default memo(Home);
