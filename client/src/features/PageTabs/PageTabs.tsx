import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { TabOption } from '@@types/ui';

import styles from './PageTabs.module.scss';

interface PageTabsProps {
  tabs: TabOption[];
  className?: string;
}

function PageTabs(props: PageTabsProps) {
  const { tabs, className = '' } = props;

  const location = useLocation();

  return (
    <div className={classNames(styles.wrapper, className)}>
      {tabs.map((tab) => {
        const tabItemClassName = classNames(styles.tab, {
          [styles.tab_active]: location.pathname === tab.route,
        });

        return (
          <Link key={tab.route} to={tab.route} className={tabItemClassName}>
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

export default PageTabs;
