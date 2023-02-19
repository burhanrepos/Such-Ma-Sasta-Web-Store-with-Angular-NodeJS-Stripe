import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
})
export class CartComponent implements OnInit {

  public cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'shoes',
        price: 250,
        quantity: 2,
        id: 2,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'shirt',
        price: 100,
        quantity: 4,
        id: 3,
      }
    ]
  };

  constructor(private cartService: CartService, private http: HttpClient){}
  public dataSource: Array<CartItem> = [];

  public displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart:Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items
    })
  }

  public getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  public onClearCart(): void{
    this.cartService.clearCart()
  }

  public onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  public onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  public onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  public onCheckout(): void {
    this.http.post('http://localhost:4242/checkout',{items: this.cart.items})
    .subscribe(async (res:any) => {
      let stripe= await loadStripe('pk_test_51LQy81G6X2KypU7ml4mTLhawbxBhSgixSNRLF0dOfkuAL6ZxEp8tXN4CC8v4ApUpiuuRLRsmNPW4vkxyiLiZC7fE00Q56Qspta');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }

}
