export interface OrquestracaoModel {
  name: string;
  path: string;
  fields: FieldModel[];
}
export interface FieldModel {
  name: string;
  label: string;
  type: string;
  description: string;
  required: boolean;
}
