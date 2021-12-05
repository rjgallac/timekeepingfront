import { Component, OnInit } from '@angular/core';
import { Day } from '../Day';
import { DaysService } from '../days.service';
import { WeekTotals } from '../SummaryDto';

@Component({
  selector: 'app-week-summary',
  templateUrl: './week-summary.component.html',
  styleUrls: ['./week-summary.component.css']
})
export class WeekSummaryComponent implements OnInit {

  constructor(private daysService: DaysService) { }

  weeks: WeekTotals = {};

  ngOnInit(): void {
    this.daysService.getDays$().subscribe( (val:Day) =>{
      if(val.summaryDto){
        this.weeks = val.summaryDto.weekTotals;
      }
    });
  }
  unsorted = (a: any, b: any): number => {
    return 0;
  }
}
