import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl:'./products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  public sort : string = 'desc';
  public itemsShowCount: number = 12;

  public onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  public onItemsUpdated(newItems: number): void {
    this.itemsShowCount = newItems;
    this.itemsCountChange.emit(newItems);

  }

  public onColumnsUpdated(columnNum: number): void {
    this.columnsCountChange.emit(columnNum);
  }

}
