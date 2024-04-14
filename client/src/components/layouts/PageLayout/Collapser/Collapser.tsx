import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectSidebar } from '@@store/ui/selectors';
import { useDispatch } from '@@store/index';
import { collapseMenu } from '@@store/ui/slice';

import styles from './Collapser.module.scss';

function Collapser() {
  const dispatch = useDispatch();

  const { isShowSidebar, isCollapsed } = useSelector(selectSidebar);

  const handleClick = () => {
    dispatch(collapseMenu());
  };

  if (!isShowSidebar) {
    return null;
  }

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <div
        className={classNames(styles.collapser, styles.collapser__top, {
          [styles.collapser__top_show]: !isCollapsed,
          [styles.collapser__top_hide]: isCollapsed,
        })}
      />
      <div
        className={classNames(styles.collapser, styles.collapser__bottom, {
          [styles.collapser__bottom_show]: !isCollapsed,
          [styles.collapser__bottom_hide]: isCollapsed,
        })}
      />
    </div>
  );
}

export default Collapser;
