import { Component, computed, signal } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  cartItems = signal<Product[]>([
    {
      id: 1,
      name: 'Product 1',
      price: 10,
    },
  ]);
  cartTotal = computed(() =>
    this.cartItems().reduce((total, item) => total + item.price, 0)
  );

  addToCart() {
    this.cartItems.update((items) => {
      let item = { ...items[items.length - 1] };
      item.id += 1;
      item.name = 'Product ' + item.id;
      return [...items, item];
    });
  }

  removeFromCart(productId: number) {
    this.cartItems.update((items) => {
      if (items.length === 1) return items;
      return items.filter((item) => item.id !== productId);
    });
  }
}
