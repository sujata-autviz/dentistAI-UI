export interface Tooth {
    id?: string; // Optional for new teeth
  tenantId: string;
  chartId: string;
  toothNumber: number;
  mobility: number;
  cal: number;
  n3: number;
  isMissing: boolean;
  isImplant: boolean;
  isBleeding: boolean;
  isSuppurating: boolean;
}

