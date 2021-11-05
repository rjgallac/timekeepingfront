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

  total: number = 0;

  ngOnInit(): void {
      this.daysService.getDays();
      this.daysService.getDays$().subscribe( (data: Day[]) => {
        this.total = this.daysService.getTotal(data)
      })
  }

  public days$(){
    return this.daysService.getDays$();
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
