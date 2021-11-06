import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Day } from './Day';
import { BehaviorSubject, Observable } from 'rxjs';
import { Week } from './Week';

@Injectable({
  providedIn: 'root'
})
export class DaysService {

  constructor(private http: HttpClient) { }

  private weekSubject = new BehaviorSubject<Week>({days:[], weekTotal:0, monthTotal: 0, monthTotalExcludingWeek: 0, yearTotal: 0, yearTotalExcludingWeek: 0});

  private totalsSubject = new BehaviorSubject<number>(0);

  public getDays$(): Observable<Week>{
    return this.weekSubject.asObservable();
  }

  public getTotals$(){
    return this.totalsSubject.asObservable();
  }

  public getDays(){
    this.http.get<Week>("http://127.0.0.1:8080/week/?startDate=" + new Date().toISOString().split("T")[0]).subscribe(data =>{
      this.weekSubject.next(data);
      console.log(data)
      this.totalsSubject.next(data.weekTotal);
    });
  }

  public deleteDay(id: String){
    return this.http.delete("http://127.0.0.1:8080/day/" + id)
  }

  public add(model: Day){
    return this.http.post("http://127.0.0.1:8080/day", model);
  }
  public update(model: Day, id: string){
    return this.http.put("http://127.0.0.1:8080/day/" + id, model);
  }


  public diff(model: Day, index: number): number{
    if(model && model.startAm){
      return this.calcDiffInHrs(model);
    }
    return 0;
  }

  public updateDay(day: Day){
    let week = this.weekSubject.getValue();
    let d = week?.days.filter(d => d.date == day.date)[0]
    d.startAm = day.startAm;
    d.endAm = day.endAm;
    d.startPm = day.startPm;
    d.endPm = day.endPm;
    this.getTotal(week?.days);
    this.weekSubject.next(this.weekSubject.getValue())
   
  }


  public convertTimeToDate(time: Date): Date {
    return new Date('2020-04-10T'+ time +'Z');
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

  public getTotal(days: Day[]) {
    let total = 0;
    for(let i=0;i<=days.length+1;i++){
      total += this.calcDiffInHrs(days[i])
    }    
    this.totalsSubject.next(total);

  }

}
