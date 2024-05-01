import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { PageContentContextProvider } from '@@contexts/PageContentContext';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';

import Page from './Page';

import { usePageTabs, useTemplate } from '../hooks';

function Dashboard() {
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
    <PrivatePageLayout dataCid="datastreams">
      <PageContentLayout
        title={`Template - ${template?.name}`}
        description="The Web Dashboard allows you to visualize data from a device or control the device using Widgets. The widgets may be organized in the dashboard by one or more tabs."
        tabs={tabs}
      >
        <PageContentContextProvider value={pageContentContext}>
          <Page />
        </PageContentContextProvider>
      </PageContentLayout>
    </PrivatePageLayout>
  );
}

export default memo(Dashboard);
