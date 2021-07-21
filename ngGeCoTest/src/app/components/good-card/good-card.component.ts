import { Component, Input, OnInit } from '@angular/core';
import { Good } from 'src/app/models/data.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-good-card',
  templateUrl: './good-card.component.html',
  styleUrls: ['./good-card.component.scss']
})
export class GoodCardComponent implements OnInit {

  @Input() goodItem: Good | null = null;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void { }

  addToCart(): void {
    let cart = this.dataService.getLocalStorageCart();
    cart += this.goodItem?.id + ';';
    this.dataService.setLocalStorageCart(cart);
  }
}
