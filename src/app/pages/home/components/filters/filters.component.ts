import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl:'filters.component.html'
})
export class FiltersComponent implements OnInit,OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  public categories : string[] = ['show', 'sports'];

  constructor(private storeService: StoreService){}
  ngOnInit(): void {
    this.getCategories();
  }
  categoriesSubscription: Subscription | undefined;

  public onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  public getCategories():void {
    try {
      this.storeService.getAllCategories().subscribe((_categories) => {
        this.categories = _categories;
      })
    } catch (error) {

    }
  }
}
