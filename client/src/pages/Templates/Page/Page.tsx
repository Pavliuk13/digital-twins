import { memo, useEffect } from 'react';

import { useDispatch } from '@@store/index';
import { showSidebar } from '@@store/ui/slice';

import EmptyContentLayout from '@@components/layouts/EmptyContentLayout';

import styles from './Page.module.scss';

interface PageProps {
  templates: unknown;
  onAddTemplate: () => void;
}

function Page(props: PageProps) {
  const { templates, onAddTemplate } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showSidebar());
  }, []);

  return (
    <div className={styles.wrapper}>
      {!templates.length && (
        <EmptyContentLayout
          title="Start by creating your first template"
          description="Template is a digital model of a physical object. It is used in SmartLab platform as a template to be assigned to devices."
          button={{
            text: 'Add template',
            onClick: onAddTemplate,
          }}
        />
      )}
    </div>
  );
}

export default memo(Page);
