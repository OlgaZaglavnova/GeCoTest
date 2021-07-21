import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Good, Category, DataType, CartVariableName } from 'src/app/models/data.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataPath = 'assets/data/data.json';
  // dataObj$: Observable<any>;
  // goods$: Observable<Good[] | null>;
  // categories: Observable<Category[] | null>;

  constructor(
    private http: HttpClient,
  ) { }

  getData$(): Observable<any> {
    return this.http.get(this.dataPath);
  }

  getLocalStorageCart(): string | null {
    const cart = localStorage.getItem(CartVariableName.LocalStorageCartName);
    return cart ?? '';
  }

  setLocalStorageCart(newValue: string | null | undefined): void {
    if (newValue) {
      localStorage.setItem(CartVariableName.LocalStorageCartName, newValue);
    }
  }

}
