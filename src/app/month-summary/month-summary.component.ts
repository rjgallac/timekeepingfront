import { Component, OnInit } from '@angular/core';
import { Day } from '../Day';
import { SummaryService } from '../summary.service';
import { MonthTotals, SummaryDto } from '../SummaryDto';

@Component({
  selector: 'app-month-summary',
  templateUrl: './month-summary.component.html',
  styleUrls: ['./month-summary.component.css']
})
export class MonthSummaryComponent implements OnInit {
  months: MonthTotals = {};

  constructor(private summaryService: SummaryService) { }

  ngOnInit(): void {
    this.summaryService.getSummaries$().subscribe( (summaryDto: SummaryDto) =>{
        this.months = summaryDto.monthTotals;
    });
    this.summaryService.getSummaries();
  }
  unsorted = (a: any, b: any): number => {
    return 0;
  }
}
