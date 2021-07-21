import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Category, Good } from 'src/app/models/data.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  goods: Good[] | null = null;
  categories: Category[] | null = null;

  menuIsOpened = true;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataService.getData$()
      .pipe(take(1))
      .subscribe(data => {
        this.goods = data.goods;
        this.categories = data.categories;
      });
  }
}
