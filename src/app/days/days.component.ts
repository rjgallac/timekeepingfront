import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Day } from '../Day';
import { DaysService } from '../days.service';

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
  }

  public days$(){
    return this.daysService.getDays$();
  }

  getTotal() {
    return this.daysService.getTotal$();
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

}
