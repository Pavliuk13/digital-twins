import { memo } from 'react';

import { useDispatch } from '@@store/index';
import { showModal } from '@@store/modals/slice';

import EmptyContentLayout from '@@components/layouts/EmptyContentLayout';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { Template } from '@@types/template';

import { DatastreamModalName } from '@@constants/modal';

import Content from './Content';

import styles from './Page.module.scss';

function Page() {
  const dispatch = useDispatch();

  const { data, isLoading, refetch } = usePageContentContext<Template>();

  const handleAddDatastream = () => {
    dispatch(
      showModal(DatastreamModalName, {
        templateId: data?.id,
        onSubmit: refetch,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <Content />
      {!data?.datastreams.length && !isLoading && (
        <EmptyContentLayout
          title="Datastreams"
          description="Datastreams is a way to structure data that regularly flows in and out from device. Use it for sensor data, any telemetry, or actuators."
          button={{
            text: 'Add datastream',
            onClick: handleAddDatastream,
          }}
        />
      )}
    </div>
  );
}

export default memo(Page);
