import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngGeCoTest';

  myData$: Observable<any> = of(null);

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.myData$ = this.dataService.getData$();
  }
}
