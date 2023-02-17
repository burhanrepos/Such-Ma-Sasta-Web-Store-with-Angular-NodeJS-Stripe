import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT : {[id:number]:number} = {1: 400, 3:335, 4: 350}

@Component({
  selector: 'app-home',
  templateUrl:'home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit{
  public columnsPerLine : number= 3;
  public category : string | undefined;
  public rowHeight : number = ROWS_HEIGHT[this.columnsPerLine];

  constructor(private cartService:CartService){}
  ngOnInit(): void {
  }

  public onColumnsCountChange(columnNum: number): void {
    this.columnsPerLine = columnNum;
    this.rowHeight = ROWS_HEIGHT[this.columnsPerLine];
  }

  public onShowCategory(newCategory: string ): void {
    this.category = newCategory;
  }

  public onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product:product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }


}
