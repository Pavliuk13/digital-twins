import { memo, useState } from 'react';

import { useCreateMqttTaskMutation } from '@@api/mqtt';

import Button from '@@components/ui/Button';
import Card from '@@components/common/Card';
import Toggle from '@@components/ui/Toggle/Toggle';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { Device } from '@@types/device';
import { Hardware } from '@@types/hardware';

import styles from './DeviceWidgets.module.scss';

function DeviceWidgets() {
  const { data } = usePageContentContext<Device>();

  const [createMqttTask] = useCreateMqttTaskMutation();

  const [state, setState] = useState();

  const handleTest = async () => {
    await createMqttTask({
      data: {
        boardName: Hardware.ESP32,
        guid: data.uGuid,
        pin: 23,
        value: state,
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <Card isScale={false}>
        <Toggle onChange={(isCheck) => setState(isCheck)} />
        <Button onClick={handleTest}>Test</Button>
      </Card>
    </div>
  );
}

export default memo(DeviceWidgets);
