import { Component, OnInit } from '@angular/core';
import { Day } from '../Day';
import { DaysService } from '../days.service';
import { MonthTotals } from '../SummaryDto';

@Component({
  selector: 'app-month-summary',
  templateUrl: './month-summary.component.html',
  styleUrls: ['./month-summary.component.css']
})
export class MonthSummaryComponent implements OnInit {
  months: MonthTotals = {};

  constructor(private daysService: DaysService) { }

  ngOnInit(): void {
    this.daysService.getDays$().subscribe( (day: Day) =>{
      if(day.summaryDto){
        this.months = day.summaryDto.monthTotals;

      }
    });
  }
  unsorted = (a: any, b: any): number => {
    return 0;
  }
}
