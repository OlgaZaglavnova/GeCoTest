import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Good } from 'src/app/models/data.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: number[] | null = null;
  cartGoods: Good[] | null = null;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.refreshCart();
  }

  refreshCart(): void {
    const cartStr = this.dataService.getLocalStorageCart();
    this.cart = cartStr && cartStr !== ''
      ? cartStr.split(';').map(cartItem => +cartItem).filter(item => item !== 0)
      : null;

    this.dataService.getData$()
      .pipe(take(1))
      .subscribe(data => {
        this.cartGoods = data.goods.filter(({ ...good }: Good) => this.cart?.includes(good.id));
      });
  }

}
