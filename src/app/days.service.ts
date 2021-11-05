import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Day } from './Day';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaysService {

  constructor(private http: HttpClient) { }

  private daysSubject = new BehaviorSubject<Day[]>([]);

  private totals: number[] = [];
  private totalsSubject = new BehaviorSubject<number[]>([]);

  public getDays$(): Observable<Day[]>{
    return this.daysSubject.asObservable();
  }

  public getTotals$(){
    return this.totalsSubject.asObservable();
  }

  public addHrsToTotals(hrs: number, idx: number){
    this.totals[idx] = hrs;
    this.totalsSubject.next(this.totals);

  }

  public getDays(){
    this.http.get<Day[]>("http://127.0.0.1:8080/day/?startDate=" + new Date().toISOString().split("T")[0]).subscribe(data =>{
      this.daysSubject.next(data);
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
    let days = this.daysSubject.getValue();
    let d = days.filter(d => d.date == day.date)[0]
    d.startAm = day.startAm;
    d.endAm = day.endAm;
    d.startPm = day.startPm;
    d.endPm = day.endPm;
    this.daysSubject.next(this.daysSubject.getValue())
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

  public getTotal(days: Day[]): number {
    console.log("HERE")
    let total = 0;
    for(let i=0;i<=days.length+1;i++){
      total += this.calcDiffInHrs(days[i])
    }    
    return total;
  }

}
