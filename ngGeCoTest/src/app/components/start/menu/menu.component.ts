import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Category } from 'src/app/models/data.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  categories: Category[] | null = null;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getData$()
      .pipe(take(1))
      .subscribe(data => {
        this.categories = data.categories;
      });
  }

}
