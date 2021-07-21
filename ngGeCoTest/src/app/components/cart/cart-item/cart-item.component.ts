import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { last, take } from 'rxjs/operators';
import { Category, Good } from 'src/app/models/data.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: Good | null | undefined = null;
  @Output() refreshCart = new EventEmitter();

  categories: Category[] | null = null;
  itemCategoryName: string | null | undefined = null;
  itemCount = 0;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    const localStorageCartStr = this.dataService.getLocalStorageCart();
    const localStorageCart = localStorageCartStr ? localStorageCartStr.split(';').map(item => +item) : null;
    this.itemCount = localStorageCart ? localStorageCart.filter(item => item === this.cartItem?.id).length : 0;
    this.dataService.getData$()
      .pipe(take(1))
      .subscribe(({ ...data }) => {
        this.categories = data.categories;
        const filteredCategory = this.categories?.filter(category =>
          this.cartItem?.category
            ? +category.id === +this.cartItem?.category
            : false
        );
        this.itemCategoryName = filteredCategory && filteredCategory?.length > 0 ? filteredCategory[0].name : null;
      });
  }

  deleteitemFromCart(): void {
    const localStorageCartStr = this.dataService.getLocalStorageCart();
    const localStorageCart = localStorageCartStr ? localStorageCartStr.split(';').map(item => +item).filter(item => item !== 0) : null;
    const lastIndex = this.cartItem?.id ? localStorageCart?.lastIndexOf(this.cartItem?.id) : -1;
    if (lastIndex && lastIndex > 0) {
      localStorageCart?.splice(lastIndex, 1);
    } else if (lastIndex === 0) {
      localStorageCart?.pop();
    }
    const newLocalStorageCartStr: string | undefined = localStorageCart?.join(';') + ';';
    this.dataService.setLocalStorageCart(newLocalStorageCartStr);
    this.itemCount -= 1;
    this.refreshCart.emit();
  }

}
