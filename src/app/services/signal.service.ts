import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  price = signal<number>(100);
  quantity = signal<number>(2);
  total = computed<number>(() => this.price() * this.quantity());

  constructor() {}

  changePrice(newValue: number) {
    this.price.update((prevValue: number) => {
      return prevValue + newValue;
    });
  }
}
