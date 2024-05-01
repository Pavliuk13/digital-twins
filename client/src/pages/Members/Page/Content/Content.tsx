import { memo } from 'react';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { User } from '@@types/user';

import MemberItem from './MemberItem';

import styles from './Content.module.scss';

function Content() {
  const { data } = usePageContentContext<User[]>();

  return (
    !!data?.length && (
      <div className={styles.wrapper}>
        <div className={styles.devices}>
          {data.map((member) => {
            return <MemberItem key={member.id} member={member} />;
          })}
        </div>
      </div>
    )
  );
}

export default memo(Content);
