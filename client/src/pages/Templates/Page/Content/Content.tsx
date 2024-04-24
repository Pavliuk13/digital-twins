import { memo } from 'react';

import { Template } from '@@types/template';

import TemplateCard from './TemplateCard';

import styles from './Content.module.scss';

interface ContentProps {
  templates: Template[];
}

function Content(props: ContentProps) {
  const { templates } = props;

  return (
    <div className={styles.wrapper}>
      {!!templates?.length && (
        <div className={styles.templates}>
          {templates.map((template) => {
            return (
              <TemplateCard
                title={template.name}
                hardware={template.hardware}
                devicesQuantity={template.devices.length}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(Content);
