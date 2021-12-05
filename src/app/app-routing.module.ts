import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaysComponent } from './days/days.component'
import { WeekSummaryComponent } from './week-summary/week-summary.component';
import { MonthSummaryComponent } from './month-summary/month-summary.component'
const routes: Routes = [
  {
    path: '',
    component: DaysComponent
  },
  {
    path: 'week',
    component: WeekSummaryComponent
  },
  {
    path: 'month',
    component: MonthSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
