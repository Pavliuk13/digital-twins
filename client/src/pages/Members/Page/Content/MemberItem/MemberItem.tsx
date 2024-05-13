import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '@@store/user/selectors';

import Typography from '@@components/ui/Typography';
import Card from '@@components/common/Card';

import { User, UserStatus } from '@@types/user';

import styles from './MemberItem.module.scss';

interface MemberItemProps {
  member: User;
}

function MemberItem(props: MemberItemProps) {
  const { member } = props;

  const { user } = useSelector(selectUser);

  return (
    <Card cursor="pointer">
      <div className={styles.wrapper}>
        <div className={styles.info}>
          {member.avatar ? (
            <img src={member.avatar} alt="Avatar" className={styles.avatar} />
          ) : (
            <div className={styles.avatar}>{member.name[0]}</div>
          )}
          <div>
            <Typography variant="subheading2">
              {member.name} {user.id === member.id ? '(You)' : ''}
            </Typography>
            <Typography variant="body">{member.email}</Typography>
          </div>
        </div>
        <span className={styles.status}>{UserStatus[member.status]}</span>
      </div>
    </Card>
  );
}

export default memo(MemberItem);
