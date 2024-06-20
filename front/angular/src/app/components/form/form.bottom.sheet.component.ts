import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bottom-sheet-component',
  template: `
    <mat-nav-list>
      <mat-list-item (click)="dismiss($event)">
        <span matListItemTitle>Formulário Enviado</span>
      </mat-list-item>
      <mat-list-item (click)="dismiss($event)" *ngFor="let item of values; let i = index">
        <span matListItemTitle>{{ item.key }}</span>
        <span matLine>{{ item.value }}</span>
      </mat-list-item>
    </mat-nav-list>
  `,
  standalone: true,
  imports: [MatListModule, MatIcon, NgFor],
})
export class FormBottomSheetComponent implements OnInit {
  valuesSubject = new BehaviorSubject<any>([]);
  values: Array<any>;

  constructor(private _bottomSheetRef: MatBottomSheetRef<FormBottomSheetComponent>) {}

  ngOnInit(): void {
    this.valuesSubject.subscribe(
      (event) =>
        (this.values = Object.entries(event)
          .filter(([key]) => Object.prototype.hasOwnProperty.call(event, key))
          .map(([key, value]) => ({ key, value }))),
    );
  }

  dismiss(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
