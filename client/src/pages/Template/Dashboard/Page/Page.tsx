import { memo } from 'react';

import WidgetList from './WidgetList';
import WidgetDashboard from './WidgetDashboard';

import styles from './Page.module.scss';

function Page() {
  return (
    <div className={styles.wrapper}>
      <WidgetList />
      <WidgetDashboard />
    </div>
  );
}

export default memo(Page);
