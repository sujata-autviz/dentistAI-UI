// src/app/models/tooth.model.ts
export interface Tooth {
  tenantId: string; // Identifier for multi-tenancy
  chartId: string; // Reference to the periodontal chart
  toothNumber: number; // E.g., 19, 32
  pocketDepthBuccalLeft?: number;
  pocketDepthBuccalCenter?: number;
  pocketDepthBuccalRight?: number;
  pocketDepthLingualLeft?: number;
  pocketDepthLingualCenter?: number;
  pocketDepthLingualRight?: number;
  gingivalMarginBuccalLeft?: number;
  gingivalMarginBuccalCenter?: number;
  gingivalMarginBuccalRight?: number;
  gingivalMarginLingualLeft?: number;
  gingivalMarginLingualCenter?: number;
  gingivalMarginLingualRight?: number;
  clinicalAttachmentLevelBuccalLeft?: number;
  clinicalAttachmentLevelBuccalCenter?: number;
  clinicalAttachmentLevelBuccalRight?: number;
  clinicalAttachmentLevelLingualLeft?: number;
  clinicalAttachmentLevelLingualCenter?: number;
  clinicalAttachmentLevelLingualRight?: number;
  isBleedingBuccalLeft: boolean;
  isBleedingBuccalCenter: boolean;
  isBleedingBuccalRight: boolean;
  isBleedingLingualLeft: boolean;
  isBleedingLingualCenter: boolean;
  isBleedingLingualRight: boolean;
  isSuppurationBuccalLeft: boolean;
  isSuppurationBuccalCenter: boolean;
  isSuppurationBuccalRight: boolean;
  isSuppurationLingualLeft: boolean;
  isSuppurationLingualCenter: boolean;
  isSuppurationLingualRight: boolean;
  mobilityGrade?: number; // 1, 2, 3
  furcationGrade?: number;
  isMissingTooth: boolean;
  hasImplant: boolean;
  notes?: string;
}