import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl:'./products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  public sort : string = 'desc';
  public itemsShowCount: number = 12;

  public onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }

  public onItemsUpdated(newItems: number): void {
    this.itemsShowCount = newItems;
  }

  public onColumnsUpdated(columnNum: number): void {
    this.columnsCountChange.emit(columnNum);
  }

}
