import { Component, OnInit } from '@angular/core';
import { Day } from '../Day';
import { DaysService } from '../days.service';
import { SummaryService } from '../summary.service';
import { SummaryDto, WeekTotals } from '../SummaryDto';

@Component({
  selector: 'app-week-summary',
  templateUrl: './week-summary.component.html',
  styleUrls: ['./week-summary.component.css']
})
export class WeekSummaryComponent implements OnInit {

  constructor(private summaryService: SummaryService) { }

  weeks: WeekTotals = {};

  ngOnInit(): void {
    this.summaryService.getSummaries$().subscribe( (summaryDto:SummaryDto) =>{
      console.log(summaryDto)
        this.weeks = summaryDto.weekTotals;
    });
    this.summaryService.getSummaries();
  }
  unsorted = (a: any, b: any): number => {
    return 0;
  }
}
