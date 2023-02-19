import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 }

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  public columnsPerLine: number = 3;
  public category: string | undefined;
  public rowHeight: number = ROWS_HEIGHT[this.columnsPerLine];
  public products: Array<Product> | undefined;
  public sort = 'desc';
  public count = '12';

  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) { }
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.getProducts();
  }
  public getProducts(): void {
    try {
      this.storeService.getAllProducts(this.count, this.sort,this.category).subscribe((_products) => {
        this.products = _products;
      })
    } catch (error) {

    }
  }

  public onColumnsCountChange(columnNum: number): void {
    this.columnsPerLine = columnNum;
    this.rowHeight = ROWS_HEIGHT[columnNum];
    console.log(this.columnsPerLine,this.rowHeight);
    
  }
  
  public onItemsCountChange(newItems: number): void {
    this.count = newItems.toString();
    this.getProducts();
  }

  public onSortChange(sortDirection: string): void {
    this.sort = sortDirection;
    this.getProducts();
  }

  public onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  public onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }


}
