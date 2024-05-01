import { memo } from 'react';

import { useCreateMqttTaskMutation } from '@@api/mqtt';

import EmptyContentLayout from '@@components/layouts/EmptyContentLayout';
import Button from '@@components/ui/Button';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { Template } from '@@types/template';
import { Hardware } from '@@types/hardware';

// import Content from './Content';

import styles from './Page.module.scss';

function Page() {
  const { data, isLoading } = usePageContentContext<Template>();

  const [createMqttTask] = useCreateMqttTaskMutation();

  const handleTest = async () => {
    await createMqttTask({
      data: {
        boardName: Hardware.ESP32,
        guid: '306898f7-f129-4c11-bf2a-ee755eae4a1e',
        pin: 2,
        value: true,
      },
    });
  };

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
