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
import { ApiModel, AppModel } from '../../app.model';
import { MenuService } from '../../services/menu/menu.service';
import { MenuModel } from './menu.model';

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
  menu$: BehaviorSubject<MenuModel[]> = new BehaviorSubject<MenuModel[]>([
    {
      label: 'Carregando Menu',
      action: [],
    },
  ]);

  @Output() form = new EventEmitter<AppModel>();
  private destroy$ = new Subject<void>();

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService
      .getMenu()
      .pipe(takeUntil(this.destroy$))
      .subscribe((menu: MenuModel[]) => this.menu$.next(menu));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  findTemplate(breadcrumb: Array<string>, api_path: string): void {
    this.menuService
      .getFieldsFromAPI(api_path)
      .pipe(takeUntil(this.destroy$))
      .subscribe((form: ApiModel) => this.form.emit({ breadcrumb, form } as AppModel));
  }
  hasChild(item: MenuModel): boolean {
    return Array.isArray(item.action) && item.action.length > 0;
  }
  isString(item: any): item is string {
    return typeof item === 'string';
  }
  isArray(item: any): item is Array<MenuModel> {
    return Array.isArray(item);
  }
}
