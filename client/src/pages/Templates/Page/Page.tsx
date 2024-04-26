import { memo } from 'react';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';

import EmptyContentLayout from '@@components/layouts/EmptyContentLayout';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { Template } from '@@types/template';

import { TemplateModalName } from '@@constants/modal';

import Content from './Content';

import styles from './Page.module.scss';

function Page() {
  const dispatch = useDispatch();

  const { data, isLoading, refetch } = usePageContentContext<Template[]>();

  const handleAddTemplate = () => {
    dispatch(
      showModal(TemplateModalName, {
        onSubmit: refetch,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <Content />
      {!data?.length && !isLoading && (
        <EmptyContentLayout
          title="Start by creating your first template"
          description="Template is a digital model of a physical object. It is used in SmartLab platform as a template to be assigned to devices."
          button={{
            text: 'Add template',
            onClick: handleAddTemplate,
          }}
        />
      )}
    </div>
  );
}

export default memo(Page);
