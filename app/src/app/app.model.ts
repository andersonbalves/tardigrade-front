export interface AppModel {
  breadcrumb: Array<string>;
  form: ApiModel;
}
export interface ApiModel {
  name: string;
  path: string;
  fields: FieldModel[];
}
export interface FieldModel {
  name: string;
  label: string;
  type: string;
  default?: any;
  description: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
}
