import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MenuService } from './service/menu.service';
import { MenuModel } from '../../model/menu.model';
import { OrquestracaoModel } from '../../model/api.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexLayoutModule,
  ],
})
export class MenuComponent implements OnInit {
  menu: MenuModel = {
    label: 'Carregando Menu',
    items: [],
  };
  @Output() orquestracao = new EventEmitter<OrquestracaoModel>();

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe((menu: MenuModel) => {
      this.menu = menu;
    });
  }

  findOrquestracaoTemplate(api_path: any) {
    this.menuService
      .getFieldsFromAPI(api_path)
      .subscribe((orquestracao: OrquestracaoModel) =>
        this.orquestracao.emit(orquestracao),
      );
  }
}
