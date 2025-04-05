import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.total = this.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.loadCart();
  }

  placeOrder() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.Id) {
      alert('Login required to place order');
      this.router.navigate(['/login']);
      return;
    }

    const orderPayload = {
      userId: user.Id,
      items: this.cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.orderService.placeOrder(orderPayload).subscribe({
      next: () => {
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        this.router.navigate(['/orders']);
      },
      error: () => alert('Failed to place order.')
    });
  }
}
