import { Component, Input, OnInit } from '@angular/core';
import { Day } from '../Day';
import { DaysService } from '../days.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  model: Day = {
    "id": "",
    "date": new Date(),
    "startAm":  new Date(),
    "endAm": new Date(),
    "startPm": new Date(),
    "endPm": new Date(),
    "notes":"",
  }

  @Input() idx: number = 0;

  public diff: number = 0;
  @Input() set day(val: Day){
    this.model.id = val.id;
    this.model.date = val.date;
    this.model.startAm = val.startAm;
    this.model.endAm = val.endAm;
    this.model.startPm = val.startPm;
    this.model.endPm = val.endPm;
    this.model.notes = val.notes;
    this.diff = this.daysService.calcDiffInHrs(val);
  }

  constructor(private daysService: DaysService) { }

  ngOnInit(): void {
  }

  public onSubmit(day: Day) { 
    if(day.id == ""){
      this.daysService.add(day).subscribe();
    } else {
      this.daysService.update(day, day.id).subscribe();
    }
  }

  updateDay(){
    this.daysService.updateDay(this.model);
    this.diff = this.daysService.calcDiffInHrs(this.model);
  }
 
}
