import toast from 'react-hot-toast';

import { useCreateMqttTaskMutation } from '@@api/mqtt';

import Toggle from '@@components/ui/Toggle';
import Spinner from '@@components/common/Spinner';

import { Widget as TypeWidget } from '@@types/widget';
import { Device } from '@@types/device';

import styles from './ToggleWidget.module.scss';

interface ToggleWidgetProps {
  deviceId: Device['id'];
  widget: TypeWidget;
  disabled?: boolean;
}

function ToggleWidget(props: ToggleWidgetProps) {
  const { deviceId, widget, disabled } = props;

  const [createMqttTask, { isLoading }] = useCreateMqttTaskMutation();

  const handleChange = async (value: boolean) => {
    await createMqttTask({
      data: {
        deviceId,
        widgetId: widget.id,
        value,
      },
    });

    toast.success('Task sent to device');
  };

  return (
    <div className={styles.wrapper}>
      <Toggle
        value={widget?.value}
        disabled={disabled || !widget}
        onChange={handleChange}
      />
      {isLoading && <Spinner size="medium" />}
    </div>
  );
}

export default ToggleWidget;
