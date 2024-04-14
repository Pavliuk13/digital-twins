import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import Typography from '@@components/ui/Typography';

import { useMenu } from './hooks';

import Divider from '../Divider';

import styles from './Menu.module.scss';

function Menu() {
  const location = useLocation();

  const menu = useMenu();

  console.log({ location });

  return (
    <div className={styles.menu}>
      {Object.entries(menu).map(
        ([menuGroupName, menuGroup], index, menuGroups) => (
          <div key={menuGroupName} className={styles.menu__group}>
            {menuGroup.map((menuItem) => {
              const menuItemClassName = classNames(styles.menu__item, {
                [styles.menu__item_active]:
                  location.pathname === menuItem.route,
              });

              return (
                <Link
                  key={menuItem.title}
                  to={menuItem.route}
                  className={menuItemClassName}
                >
                  {menuItem.icon()}
                  <Typography variant="bodyBold">{menuItem.title}</Typography>
                </Link>
              );
            })}

            {index !== menuGroups.length - 1 && <Divider offset={48} />}
          </div>
        ),
      )}
    </div>
  );
}

export default Menu;
