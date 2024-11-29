// src/app/models/tooth.model.ts
export interface Tooth {
  // tenantId: string; // Identifier for multi-tenancy
  // chartId: string; // Reference to the periodontal chart
  toothNumber: number; // E.g., 19, 32
    // Properties for teeth 1-5, 12-21, 28-32
    distalBuccal?: number;
    buccal?: number;
    mesialBuccal?: number;
    distalLingual?: number;
    lingual?: number;
    mesialLingual?: number;
  
    // Properties for teeth 6-11, 22-27
    distalFacial?: number;
    facial?: number;
    mesialFacial?: number;
    distalPalatial?: number;
    palatial?: number;
    mesialPalatial?: number;

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
  mucogingivalJunctionBuccalLeft?: number;
  mucogingivalJunctionBuccalCenter?: number;
  mucogingivalJunctionBuccalRight?: number;
  mucogingivalJunctionLingualLeft?: number;
  mucogingivalJunctionLingualCenter?: number;
  mucogingivalJunctionLingualRight?: number;
  mobilityGrade?: number; // 1, 2, 3
  furcationGrade?: number;
  isMissingTooth: boolean;
  hasImplant: boolean;
  notes?: string;
}
// Define the interface for each tooth's pocket depth values
export interface PocketDepth {
  toothNumber: number;

   // Properties for teeth 1-5, 12-21, 28-32
   distalBuccal?: number;
   buccal?: number;
   mesialBuccal?: number;
   distalLingual?: number;
   lingual?: number;
   mesialLingual?: number;
 
   // Properties for teeth 6-11, 22-27
   distalFacial?: number;
   facial?: number;
   mesialFacial?: number;
   distalPalatial?: number;
   palatial?: number;
   mesialPalatial?: number;
  // pocketDepthBuccalLeft: number | undefined;
  // pocketDepthBuccalCenter: number | undefined;
  // pocketDepthBuccalRight: number | undefined;
  // pocketDepthLingualLeft: number | undefined;
  // pocketDepthLingualCenter: number | undefined;
  // pocketDepthLingualRight: number | undefined;
  mobilityGrade?: number;
}

export interface GingivalMargin {
  toothNumber: number;
  gingivalMarginBuccalLeft?: number | null;
  gingivalMarginBuccalCenter?: number | null;
  gingivalMarginBuccalRight?: number | null;
  gingivalMarginLingualLeft?: number | null;
  gingivalMarginLingualCenter?: number | null;
  gingivalMarginLingualRight?: number | null;
}

export interface clinicalAttachmentLevel {
  toothNumber: number;
  clinicalAttachmentLevelBuccalLeft?: number;
  clinicalAttachmentLevelBuccalCenter?: number;
  clinicalAttachmentLevelBuccalRight?: number;
  clinicalAttachmentLevelLingualLeft?: number;
  clinicalAttachmentLevelLingualCenter?: number;
  clinicalAttachmentLevelLingualRight?: number;
}

export interface Bleeding {
  toothNumber: number;
  isBleedingBuccalLeft: boolean;
  isBleedingBuccalCenter: boolean;
  isBleedingBuccalRight: boolean;
  isBleedingLingualLeft: boolean;
  isBleedingLingualCenter: boolean;
  isBleedingLingualRight: boolean;
}

export interface Suppuration {
  toothNumber: number;
  isSuppurationBuccalLeft: boolean;
  isSuppurationBuccalCenter: boolean;
  isSuppurationBuccalRight: boolean;
  isSuppurationLingualLeft: boolean;
  isSuppurationLingualCenter: boolean;
  isSuppurationLingualRight: boolean;
}

export interface MucogingivalJunction {
  toothNumber: number;
  mucogingivalJunctionBuccalLeft?: number;
  mucogingivalJunctionBuccalCenter?: number;
  mucogingivalJunctionBuccalRight?: number;
  mucogingivalJunctionLingualLeft?: number;
  mucogingivalJunctionLingualCenter?: number;
  mucogingivalJunctionLingualRight?: number;
}


export interface AddOrUpdateTeethDto {
  patientId: string;
  tenantId: string;
  chartId?: string | null;
  teeth: Tooth[];
}