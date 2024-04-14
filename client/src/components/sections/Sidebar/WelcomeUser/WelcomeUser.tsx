import { useSelector } from 'react-redux';

import { selectAvatar } from '@@store/ui/selectors';

import styles from './WelcomeUser.module.scss';

function WelcomeUser() {
  const avatar = useSelector(selectAvatar);

  return (
    <div className={styles.wrapper}>
      <img src={avatar} alt="Avatar" className={styles.avatar} />
      <div>
        <p className={styles.welcome}>Welcome lab,</p>
        <p className={styles.name}>User Name</p>
      </div>
    </div>
  );
}

export default WelcomeUser;
