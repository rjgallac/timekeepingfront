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
  private totalSubject = new BehaviorSubject<number>(0);
  public getDays$(): Observable<Day[]>{
    return this.daysSubject.asObservable();
  }
  private diffs:number[] =[]


  public getTotal$(): Observable<number> {
    return this.totalSubject.asObservable();
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
      let hrsDiff = this.calcDiffInHrs(model);
      this.diffs[index] = hrsDiff;
      let total = this.diffs.reduce((p, c) => p + c, 0)
        // this.totalSubject.next(total);
      return hrsDiff;
    }
    return 0;
  }



  public convertTimeToDate(time: Date): Date {
    return new Date('2020-04-10T'+ time +'Z');
  }

  public calcDiffInHrs(model: Day): number {
    let d1 = new Date(this.convertTimeToDate(model.startAm));
    let d2 = new Date(this.convertTimeToDate(model.endAm));
    let d3 = new Date(this.convertTimeToDate(model.startPm));
    let d4 = new Date(this.convertTimeToDate(model.endPm));
    let diffAM = (d2.getTime() - d1.getTime()) /1000 /60 /60;
    let diffPM = (d4.getTime() - d3.getTime()) /1000 /60 /60
    return  diffAM + diffPM;
  }

}
