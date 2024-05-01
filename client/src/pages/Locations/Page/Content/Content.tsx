import { memo } from 'react';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { Location } from '@@types/locations';

import LocationCard from './LocationCard';

import styles from './Content.module.scss';

function Content() {
  const { data } = usePageContentContext<Location[]>();

  return (
    !!data?.length && (
      <div className={styles.wrapper}>
        <div className={styles.locations}>
          {data.map((location) => {
            return <LocationCard location={location} />;
          })}
        </div>
      </div>
    )
  );
}

export default memo(Content);
