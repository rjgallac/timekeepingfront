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
  private date: Date = new Date();

  ngOnInit(): void {
      this.daysService.getDays();
      this.daysService.getDate$().subscribe(data =>{
        this.date = data;
      })
  }


  public totals(){
    return this.daysService.getTotals$();
  }

  public next(){
    this.date.setDate(this.date.getDate() +1);
    this.daysService.updateDate(this.date)
  }

  public previous(){
    this.date.setDate(this.date.getDate() -1);
    this.daysService.updateDate(this.date);
  }
  // public getMonday(){
  //   let today = new Date();
  //   let day = today.getDay();
  //   let diff = today.getDate() - day + (day == 0  ? -6:1);
  //   let newDate = new Date(today.setDate(diff));
  //   return newDate;
  // }



}
