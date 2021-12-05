import { SummaryDto } from "./SummaryDto";

export interface Day{
    id: string;
    date: Date;
    startAm: Date;
    endAm: Date;
    startPm: Date;
    endPm: Date;
    notes: String;
    summaryDto?: SummaryDto;
}