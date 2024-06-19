import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ErrorStateMatcher, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FieldModel } from '../../model/api.model';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormModel } from './form.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPseudoCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDividerModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    SidebarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  private fieldsSubject = new BehaviorSubject<FieldModel[]>([]);
  private subscription: Subscription;

  @Input() set fields(value: FieldModel[]) {
    this.fieldsSubject.next(value);
  }

  formModel: FormModel[];
  form: FormGroup;
  matcher = new ErrorStateMatcher();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
    this.subscription = this.fieldsSubject.subscribe((fields) => {
      this.formModel = this.createFormModel(fields);
      this.form = this.createForm(fields);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm(fields: FieldModel[]): FormGroup {
    const controls: { [key: string]: FormControl } = this.createFormModel(fields).reduce(
      (acc, field) => {
        return {
          ...acc,
          [field.name]: field.fieldFormControl,
        };
      },
      {} as { [key: string]: FormControl },
    );

    controls['ambiente'] = new FormControl('dev');
    controls['usuario'] = new FormControl('', Validators.required);

    return this.formBuilder.group(controls);
  }

  createFormModel(fields: FieldModel[]): FormModel[] {
    return fields.map((field) => ({
      ...field,
      fieldFormControl: this.createControl(field),
    }));
  }

  createControl(field: FieldModel): FormControl {
    const validators = this.createValidators(field);
    return new FormControl(field.default, validators);
  }

  createValidators(field: FieldModel): any {
    const validatorMappings: { [key: string]: (value: any) => Validators } = {
      required: () => Validators.required,
      minLength: (value) => Validators.minLength(value),
      maxLength: (value) => Validators.maxLength(value),
      email: () => Validators.email,
    };

    return Object.keys(validatorMappings)
      .filter((key) => field[key as keyof FieldModel] !== undefined)
      .map((key) => validatorMappings[key](field[key as keyof FieldModel]));
  }

  executar() {
    console.log({
      message: 'executar',
      formGroup: this.form,
      values: this.form.value,
    });
  }
}
