import { FormControl } from '@angular/forms';
import { FieldModel } from '../../model/api.model';

export interface FormModel extends FieldModel {
  fieldFormControl: FormControl;
}
