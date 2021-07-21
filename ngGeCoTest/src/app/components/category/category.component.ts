import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Good } from 'src/app/models/data.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  goods: Good[] | null = null;
  filteredGoods: Good[] | null = [];

  private destroyed$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.dataService.getData$()
    ])
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(
        ([params, data]) => {
          this.goods = data
            ? params.id
              ? data?.goods?.filter(({ ...goodItem }) => +goodItem.category === +params.id)
              : data.goods
            : [];
        }
      );
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  openCart(): void {
    this.router.navigate(['/cart']);
  }

}
