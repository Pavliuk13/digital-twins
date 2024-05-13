import { memo } from 'react';
import { useParams } from 'react-router-dom';

import Typography from '@@components/ui/Typography';
import Card from '@@components/common/Card';
import Widget from '@@features/Widget';

import { usePageContentContext } from '@@contexts/PageContentContext';

import { Data } from '../types';

function DeviceWidgets() {
  const { deviceId } = useParams();

  const {
    data: { deviceWidgets, device },
  } = usePageContentContext<Data>();

  return (
    <div>
      <Card isScale={false}>
        <div>
          <Typography variant="subheading2" bottomOffset={16}>
            Widgets
          </Typography>
        </div>
        <div>
          {deviceWidgets?.map((widget) => {
            return (
              <Widget
                key={widget.id}
                title={widget.title}
                type={widget.type}
                widget={widget}
                templateId={device.templateId}
                deviceId={deviceId}
                isEditable={false}
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default memo(DeviceWidgets);
