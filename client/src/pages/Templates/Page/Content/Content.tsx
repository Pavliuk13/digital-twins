import { memo } from 'react';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { Template } from '@@types/template';

import TemplateCard from './TemplateCard';

import styles from './Content.module.scss';

function Content() {
  const { data } = usePageContentContext<Template[]>();

  return (
    !!data?.length && (
      <div className={styles.wrapper}>
        <div className={styles.templates}>
          {data.map((template) => {
            return <TemplateCard template={template} />;
          })}
        </div>
      </div>
    )
  );
}

export default memo(Content);
