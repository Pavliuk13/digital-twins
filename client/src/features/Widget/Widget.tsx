import toast from 'react-hot-toast';

import { showModal } from '@@store/modals/slice';
import { useDispatch } from '@@store/index';
import { useDeleteWidgetMutation } from '@@api/widgets';

import Card from '@@components/common/Card';
import Typography from '@@components/ui/Typography';
import Button from '@@components/ui/Button';
import Image from '@@components/ui/Image';

import EditSvg from '@@assets/icons/edit.svg';
import TrashSvg from '@@assets/icons/trash.svg';
import PlusSvg from '@@assets/icons/plus.svg';

import { Widget as TypeWidget, WidgetType } from '@@types/widget';
import { Template } from '@@types/template';
import { Device } from '@@types/device';

import { ConfirmDeleteModalName, WidgetModalName } from '@@constants/modal';

import ToggleWidget from './ToggleWidget';

import styles from './Widget.module.scss';

const widgets = {
  [WidgetType.Toggle]: ToggleWidget,
};

interface WidgetProps {
  title: string;
  type: WidgetType;
  widget: TypeWidget;
  deviceId: Device['id'];
  templateId: Template['id'];
  disabled?: boolean;
  isEditable?: boolean;
  onAssign?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

function Widget(props: WidgetProps) {
  const {
    title,
    type,
    deviceId,
    templateId,
    widget,
    disabled = false,
    isEditable = true,
    onAssign,
    onEdit,
    onDelete,
  } = props;

  const WidgetByType = widgets[type];

  const dispatch = useDispatch();

  const [deleteWidget] = useDeleteWidgetMutation();

  const handleAssignWidget = () => {
    if (!widget) {
      dispatch(
        showModal(WidgetModalName, {
          widgetType: type,
          templateId,
          onSubmit: onAssign,
        }),
      );
    }
  };

  const handleEditWidget = () => {
    dispatch(
      showModal(WidgetModalName, {
        data: widget,
        widgetType: type,
        templateId,
        onSubmit: onEdit,
        onDelete,
      }),
    );
  };

  const handleDeleteWidget = () => {
    dispatch(
      showModal(ConfirmDeleteModalName, {
        title: 'Delete widget?',
        description:
          'This operation is not reversible, are sure you want to delete the widget?',
        onConfirm: async () => {
          await deleteWidget({ params: { widgetId: widget.id } });

          onDelete?.();

          toast.success('Widget successfully deleted');
        },
      }),
    );
  };

  return (
    <Card
      cursor={widget ? 'default' : 'pointer'}
      isScale={!widget}
      className={styles.wrapper}
      onClick={handleAssignWidget}
    >
      <div className={styles.widget}>
        <Typography bottomOffset={8}>{title}</Typography>
        <WidgetByType deviceId={deviceId} widget={widget} disabled={disabled} />
      </div>
      <div className={styles.actions}>
        {widget ? (
          isEditable && (
            <>
              <Button
                variant="outline"
                color="blue_500"
                onClick={handleEditWidget}
              >
                <Image image={EditSvg} cursor="pointer" />
              </Button>
              <Button
                variant="outline"
                color="red_500"
                onClick={handleDeleteWidget}
              >
                <Image image={TrashSvg} cursor="pointer" />
              </Button>
            </>
          )
        ) : (
          <Button variant="outline" color="grey_200">
            <Image image={PlusSvg} cursor="pointer" />
          </Button>
        )}
      </div>
    </Card>
  );
}

export default Widget;
