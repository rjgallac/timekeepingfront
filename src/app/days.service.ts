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

  private daysSubject = new BehaviorSubject<Day>({'id': '', 'date': new Date(), 'startAm': new Date(), 'endAm': new Date(), 'startPm': new Date(), 'endPm': new Date(),notes: '' });

  private dateSubject = new BehaviorSubject<Date>(new Date());

  private totalsSubject = new BehaviorSubject<number>(0);

  public getDays$(): Observable<Day>{
    return this.daysSubject.asObservable();
  }

  public getTotals$(){
    return this.totalsSubject.asObservable();
  }
  public getDate$(){
    return this.dateSubject.asObservable();
  }
  public updateDate(val: Date){
    this.dateSubject.next(val);
    this.getDays();
  }

  public updateDay(val: Day){
    this.daysSubject.next(val)
  }

  public getDays(){
    let today = this.dateSubject.value.toISOString().split("T")[0];
    // let today = "2021-11-05"
    this.http.get<Day>("http://127.0.0.1:8080/day/?startDate=" + today).subscribe(data =>{
      this.daysSubject.next(data);
      // this.totalsSubject.next(data.weekTotal);
    });
  }

  public deleteDay(id: String){
    return this.http.delete<Day>("http://127.0.0.1:8080/day/" + id)
  }

  public add(model: Day){
    return this.http.post<Day>("http://127.0.0.1:8080/day", model);
  }
  public update(model: Day, id: string){
    return this.http.put<Day>("http://127.0.0.1:8080/day/" + id, model);
  }


  public diff(model: Day, index: number): number{
    if(model && model.startAm){
      return this.calcDiffInHrs(model);
    }
    return 0;
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
