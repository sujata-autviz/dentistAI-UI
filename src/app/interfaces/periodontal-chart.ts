import { Tooth } from "./tooth";

export interface PeriodontalChart {
    id?: string; // Optional for new charts
    tenantId: string;
    patientId: string;
    chartDate: Date;
    teeth: Tooth[];
}

export interface PeriodontalChartDto {
    id: string; // Use string for the client-side representation
    patientID: string;
    tenantId: string;
    chartDate: Date; // Date of the chart
    isDeleted: boolean; // Indicates if the chart is deleted
    teeth: Tooth[]; // List of teeth details
}