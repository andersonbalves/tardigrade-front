import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { MenuComponent } from './components/menu/menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FieldModel, OrquestracaoModel } from './model/api.model';

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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'Cadastro de Pessoas';
  fields: FieldModel[] = [];

  receberCampos(orquestracao: OrquestracaoModel): void {
    this.fields = orquestracao.fields;
    this.title = orquestracao.name;
  }
}
