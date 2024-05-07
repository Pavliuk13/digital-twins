import { useSelector } from 'react-redux';

import { selectUser } from '@@store/user/selectors';

import styles from './WelcomeUser.module.scss';

function WelcomeUser() {
  const { user = {} } = useSelector(selectUser);

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>{user.name?.[0] || ''}</div>
      <div className={styles.user}>
        <p className={styles.welcome}>Welcome lab,</p>
        <p className={styles.name}>{user.name}</p>
      </div>
    </div>
  );
}

export default WelcomeUser;
