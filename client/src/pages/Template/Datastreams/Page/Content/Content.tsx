import { memo } from 'react';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { Template } from '@@types/template';

import DatastreamItem from './DatastreamItem';

import styles from './Content.module.scss';

function Content() {
  const { data } = usePageContentContext<Template>();

  return (
    !!data?.datastreams.length && (
      <div className={styles.wrapper}>
        <div className={styles.templates}>
          {data.datastreams.map((datastream) => {
            return <DatastreamItem datastream={datastream} />;
          })}
        </div>
      </div>
    )
  );
}

export default memo(Content);
