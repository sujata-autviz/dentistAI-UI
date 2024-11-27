import { Tooth } from "./tooth";

export interface PeriodontalChart {
    id?: string; // Optional for new charts
    tenantId: string;
    patientId: string;
    chartDate: Date;
    teeth: Tooth[];
}
