import { memo } from 'react';

import EmptyContentLayout from '@@components/layouts/EmptyContentLayout';
import Button from '@@components/ui/Button';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { Template } from '@@types/template';

// import Content from './Content';

import styles from './Page.module.scss';

function Page() {
  const { data, isLoading } = usePageContentContext<Template>();

  const handleTest = () => {};

  return (
    <div className={styles.wrapper}>
      {/* <Content /> */}
      <Button fullWidth onClick={handleTest}>
        Test
      </Button>
      {!data?.datastreams.length && !isLoading && (
        <EmptyContentLayout
          title="Datastreams"
          description="Datastreams is a way to structure data that regularly flows in and out from device. Use it for sensor data, any telemetry, or actuators."
        />
      )}
    </div>
  );
}

export default memo(Page);
