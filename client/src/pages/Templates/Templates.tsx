import { memo, useMemo } from 'react';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';
import Header from '@@components/sections/Header';

import { PageContentContextProvider } from '@@contexts/PageContentContext';

import { TemplateModalName } from '@@constants/modal';

import Page from './Page';

import { useTemplates } from './hooks';

function Templates() {
  const { templates, isLoading, refetch } = useTemplates();

  const dispatch = useDispatch();

  const pageContentContext = useMemo(() => {
    return {
      data: templates,
      isLoading,
      refetch,
    };
  }, [templates, isLoading]);

  const handleAddTemplate = () => {
    dispatch(
      showModal(TemplateModalName, {
        onSubmit: refetch,
      }),
    );
  };

  return (
    <PrivatePageLayout dataCid="templates">
      <Header title="Templates" />
      <PageContentLayout
        title="Templates"
        description="Create new templates to manage your devices"
        button={{
          text: 'Add template',
          onClick: handleAddTemplate,
        }}
        isLoading={isLoading}
      >
        <PageContentContextProvider value={pageContentContext}>
          <Page />
        </PageContentContextProvider>
      </PageContentLayout>
    </PrivatePageLayout>
  );
}

export default memo(Templates);
