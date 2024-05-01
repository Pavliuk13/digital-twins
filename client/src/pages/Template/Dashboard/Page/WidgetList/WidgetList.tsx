import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { usePageContentContext } from '@@contexts/PageContentContext';

import Typography from '@@components/ui/Typography';
import Widget from '@@features/Widget';

import { Widget as TypeWidget, WidgetType } from '@@types/widget';

import styles from './WidgetList.module.scss';

function WidgetList() {
  const { templateId } = useParams();

  const { refetch } = usePageContentContext<TypeWidget[]>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Typography variant="subheading2">Widgets</Typography>
      </div>
      <div className={styles.list}>
        <Widget
          title="Toggle"
          type={WidgetType.Toggle}
          templateId={templateId}
          onAssign={refetch}
        />
      </div>
    </div>
  );
}

export default memo(WidgetList);
