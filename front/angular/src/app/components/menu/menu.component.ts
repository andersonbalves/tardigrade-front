import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrquestracaoModel } from '../../model/api.model';
import { MenuModel } from '../../model/menu.model';
import { MenuService } from '../../services/menu/menu.service';

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
export class MenuComponent implements OnInit, OnDestroy {
  menu$: BehaviorSubject<MenuModel> = new BehaviorSubject<MenuModel>({
    label: 'Carregando Menu',
    items: [],
  });

  @Output() orquestracao = new EventEmitter<OrquestracaoModel>();
  private destroy$ = new Subject<void>();

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService
      .getMenu()
      .pipe(takeUntil(this.destroy$))
      .subscribe((menu: MenuModel) => this.menu$.next(menu));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  findTemplate(api_path: string): void {
    this.menuService
      .getFieldsFromAPI(api_path)
      .pipe(takeUntil(this.destroy$))
      .subscribe((orquestracao: OrquestracaoModel) => this.orquestracao.emit(orquestracao));
  }
}
