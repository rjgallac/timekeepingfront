import { Day } from "./Day";

export interface Week{
    days: Day[];
    weekTotal: number;
    monthTotal: number;
    monthTotalExcludingWeek: number;
    yearTotal: number;
    yearTotalExcludingWeek: number;

}