import { Datastream } from '@@types/datastream';
import { Template } from '@@types/template';

export enum WidgetType {
  Toggle,
}

export interface Widget {
  id: number;
  title: string;
  type: WidgetType;
  datastreamId: Datastream['id'];
  templateId: Template['id'];
  value: 0 | 1;
}

export type UpdateWidgetArgs = Omit<Pick, 'title' | 'datastreamId'> & {
  widgetId: Widget['id'];
};
