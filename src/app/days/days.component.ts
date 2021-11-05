import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Day } from '../Day';
import { DaysService } from '../days.service';
import { map, filter, tap } from 'rxjs/operators'

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {

  constructor(private daysService: DaysService) { }

  week:Day[] = [];

  total: number = 0;

  ngOnInit(): void {
      this.daysService.getDays();
      this.daysService.getDays$().subscribe( (data: Day[]) => {
        console.log(data)
        this.getTotal(data)
      })
  }

  public days$(){
    return this.daysService.getDays$();
  }

  public getTotal(day: Day[]) {
    this.daysService.getDays$().subscribe( data =>{
      this.total = 0;

      for(let i=0;i<=data.length+1;i++){
        this.total += this.calcDiffInHrs(data[i])
      }
    })
    return this.total;
    
  }

  public getMonday(){
    let today = new Date();
    let day = today.getDay();
    let diff = today.getDate() - day + (day == 0  ? -6:1);
    let newDate = new Date(today.setDate(diff));
    return newDate;
  }

  deleteDay(id: String){
    console.log(id)
    this.daysService.deleteDay(id).subscribe();
  }

  public calcDiffInHrs(model: Day): number {
    if(!model || !model.startAm){
      return 0;
    }
    let d1 = new Date(this.convertTimeToDate(model.startAm));
    let d2 = new Date(this.convertTimeToDate(model.endAm));
    let d3 = new Date(this.convertTimeToDate(model.startPm));
    let d4 = new Date(this.convertTimeToDate(model.endPm));
    let diffAM = (d2.getTime() - d1.getTime()) /1000 /60 /60;
    let diffPM = (d4.getTime() - d3.getTime()) /1000 /60 /60
    return  diffAM + diffPM;
  }

  public convertTimeToDate(time: Date): Date {
    return new Date('2020-04-10T'+ time +'Z');
  }
}
