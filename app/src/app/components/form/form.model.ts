import { FormControl } from '@angular/forms';
import { FieldModel } from '../../app.model';

export interface FormModel extends FieldModel {
  fieldFormControl: FormControl;
}
