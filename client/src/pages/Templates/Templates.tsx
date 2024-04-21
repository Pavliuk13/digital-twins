import { memo } from 'react';

import PrivatePageLayout from '@@components/layouts/PrivatePageLayout';
import PageContentLayout from '@@components/layouts/PageContentLayout';
import Header from '@@components/sections/Header/Header';

import Page from './Page';

import { useTemplates } from './hooks';

function Templates() {
  const { templates, onAddTemplate } = useTemplates();

  return (
    <PrivatePageLayout dataCid="templates">
      <Header title="Templates" />
      <PageContentLayout
        title="Templates"
        description="Create new templates to manage your devices"
        button={{
          text: 'Add template',
          onClick: onAddTemplate,
        }}
      >
        <Page templates={templates} onAddTemplate={onAddTemplate} />
      </PageContentLayout>
    </PrivatePageLayout>
  );
}

export default memo(Templates);
