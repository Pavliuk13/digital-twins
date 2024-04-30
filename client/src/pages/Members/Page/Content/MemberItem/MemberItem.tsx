import { memo } from 'react';

import Typography from '@@components/ui/Typography';
import Card from '@@components/common/Card';

import { User } from '@@types/user';

import styles from './MemberItem.module.scss';

interface MemberItemProps {
  member: User;
}

function MemberItem(props: MemberItemProps) {
  const { member } = props;

  return (
    <Card cursor="pointer">
      <div className={styles.wrapper}>
        {member.avatar ? (
          <img src={member.avatar} alt="Avatar" className={styles.avatar} />
        ) : (
          <div className={styles.avatar}>{member.name[0]}</div>
        )}

        <div>
          <Typography variant="subheading2">{member.name}</Typography>
          <Typography variant="body">{member.email}</Typography>
        </div>
      </div>
    </Card>
  );
}

export default memo(MemberItem);
