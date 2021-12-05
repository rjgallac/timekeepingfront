import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SummaryDto } from './SummaryDto';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private summarySubject = new BehaviorSubject<SummaryDto>({weekTotals:{},monthTotals:{}});

  constructor(private http: HttpClient) { }

  public getSummaries$(): Observable<SummaryDto>{
    return this.summarySubject.asObservable();
  }
  public getSummaries(){
    this.http.get<SummaryDto>("http://127.0.0.1:8080/summary").subscribe(data =>{
      this.summarySubject.next(data);
    });
  }
}
