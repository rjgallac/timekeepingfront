export interface SummaryDto{
    weekTotals: WeekTotals;
    monthTotals: MonthTotals;
}

export interface WeekTotals{
    [key: number]: number;   
}

export interface MonthTotals{
    [key: number]: Month;
}

export interface Month{
    mth: number;
    expected: number;
    actual: number;
}