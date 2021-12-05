import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DaysComponent } from './days/days.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DayComponent } from './day/day.component';
import { WeekSummaryComponent } from './week-summary/week-summary.component';
import { MonthSummaryComponent } from './month-summary/month-summary.component'; 


@NgModule({
  declarations: [
    AppComponent,
    DaysComponent,
    DayComponent,
    WeekSummaryComponent,
    MonthSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
