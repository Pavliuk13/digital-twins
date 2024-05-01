import Spinner from '@@components/common/Spinner';

import styles from './Splash.module.scss';

function Splash() {
  return (
    <div className={styles.wrapper}>
      <Spinner size="big" />
    </div>
  );
}

export default Splash;
