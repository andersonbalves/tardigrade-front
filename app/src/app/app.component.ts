import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { AppModel, FieldModel } from './app.model';
import { FormComponent } from './components/form/form.component';
import { MenuComponent } from './components/menu/menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FlexLayoutModule,
    FormComponent,
    SidebarComponent,
    MenuComponent,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string;
  fields: Array<FieldModel>;
  breadcrumb: Array<string>;

  receberCampos(model: AppModel): void {
    this.fields = model.form.fields;
    this.title = model.form.name;
    this.breadcrumb = model.breadcrumb;
  }
}
