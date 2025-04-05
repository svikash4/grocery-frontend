import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log('🔄 Calling productService.getProducts()...');
    this.productService.getProducts().subscribe({
      next: (res) => {
        console.log('✅ Products received:', res);
        this.products = res;
      },
      error: (err) => console.error('❌ Product fetch failed:', err)
    });
  }

  addToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.productId === product.Id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ productId: product.Id, name: product.Name, quantity: 1, price: product.Price });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('✅ Added to cart!');
  }
}
