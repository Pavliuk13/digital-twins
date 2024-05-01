import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { PageContentContextProvider } from '@@contexts/PageContentContext';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';

import { useTemplateWidgets } from './hooks';
import { usePageTabs } from '../hooks';

import Page from './Page';

function Dashboard() {
  const { templateId } = useParams();

  const tabs = usePageTabs(templateId);

  const { templateWidgets, isLoading, refetch } = useTemplateWidgets();

  const pageContentContext = useMemo(() => {
    return {
      data: templateWidgets,
      isLoading,
      refetch,
    };
  }, [templateWidgets, isLoading]);

  return (
    <PrivatePageLayout dataCid="dashboard">
      <PageContentLayout
        title="Template dashboard"
        description="The dashboard allows you to visualize data from a device or control the device using widgets"
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
