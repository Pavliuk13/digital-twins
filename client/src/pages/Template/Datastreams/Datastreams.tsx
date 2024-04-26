import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';

import { PageContentContextProvider } from '@@contexts/PageContentContext';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';

import { DatastreamModalName } from '@@constants/modal';

import Page from './Page';

import { usePageTabs, useTemplate } from '../hooks';

function Datastreams() {
  const { templateId } = useParams();

  const dispatch = useDispatch();

  const tabs = usePageTabs(templateId);

  const { template, isLoading, refetch } = useTemplate();

  const pageContentContext = useMemo(() => {
    return {
      data: template,
      isLoading,
      refetch,
    };
  }, [template, isLoading]);

  const handleAddDatastream = () => {
    dispatch(
      showModal(DatastreamModalName, {
        templateId: template?.id,
        onSubmit: refetch,
      }),
    );
  };

  return (
    <PrivatePageLayout dataCid="datastreams">
      <PageContentLayout
        title={`Template - ${template?.name}`}
        tabs={tabs}
        button={{
          text: 'Add datastream',
          onClick: handleAddDatastream,
        }}
      >
        <PageContentContextProvider value={pageContentContext}>
          <Page />
        </PageContentContextProvider>
      </PageContentLayout>
    </PrivatePageLayout>
  );
}

export default memo(Datastreams);
