import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { FormComponent } from './components/form/form.component';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { FieldModel, OrquestracaoModel } from './model/api.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FlexLayoutModule,
    FlexLayoutServerModule,
    FormComponent,
    ReactiveFormsModule,
    MatButtonModule,
    SidebarComponent,
    MenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'Cadastro de Pessoas';
  fields: FieldModel[] = [];

  readonly hideRequiredControl = new FormControl(false);
  readonly floatLabelControl = new FormControl('always' as FloatLabelType);

  readonly options = inject(FormBuilder).group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  receberCampos(orquestracao: OrquestracaoModel) {
    this.fields = orquestracao.fields;
    this.title = orquestracao.name;
    console.log({
      orquestracao,
      fields: orquestracao.fields,
      title: this.title,
    });
  }
}
