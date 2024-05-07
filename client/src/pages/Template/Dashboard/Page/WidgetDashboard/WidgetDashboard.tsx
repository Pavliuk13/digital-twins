import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { usePageContentContext } from '@@contexts/PageContentContext';

import Typography from '@@components/ui/Typography';
import Widget from '@@features/Widget';

import { Widget as TypeWidget } from '@@types/widget';

import styles from './WidgetDashboard.module.scss';

function WidgetDashboard() {
  const { templateId } = useParams();

  const { data, refetch } = usePageContentContext<TypeWidget[]>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Typography variant="subheading2">Added widgets</Typography>
      </div>
      <div className={styles.list}>
        {data?.map((widget) => {
          return (
            <Widget
              key={widget.id}
              title={widget.title}
              type={widget.type}
              widget={widget}
              templateId={templateId}
              disabled
              onAssign={refetch}
              onEdit={refetch}
              onDelete={refetch}
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(WidgetDashboard);
