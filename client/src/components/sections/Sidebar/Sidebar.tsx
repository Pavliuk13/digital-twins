import { memo } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectSidebar } from '@@store/ui/selectors';

import Logo from './Logo';
import Divider from './Divider';
import WelcomeUser from './WelcomeUser';
import Menu from './Menu';

import styles from './Sidebar.module.scss';

function Sidebar() {
  const { isCollapsed, isShowSidebar } = useSelector(selectSidebar);

  if (!isShowSidebar) {
    return null;
  }

  const sidebarClassName = classNames(styles.sidebar, {
    [styles.sidebar_show]: isCollapsed,
    [styles.sidebar_hide]: !isCollapsed,
  });

  return (
    <div className={sidebarClassName}>
      <Logo />
      <Divider />
      <WelcomeUser />
      <Menu />
    </div>
  );
}

export default memo(Sidebar);
