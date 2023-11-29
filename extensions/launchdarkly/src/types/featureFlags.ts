export interface FeatureFlag {
  items: ItemsItem[];
  _links: _links;
  totalCount: number;
  totalCountWithDifferences: number;
}
export interface ItemsItem {
  name?: string;
  kind?: string;
  description?: string;
  key?: string;
  _version?: number;
  creationDate?: number;
  includeInSnippet?: boolean;
  clientSideAvailability?: ClientSideAvailability;
  variations?: VariationsItem[];
  temporary?: boolean;
  tags?: string[];
  _links?: _links;
  maintainerId?: string;
  _maintainer?: _maintainer;
  maintainerTeamKey?: string;
  _maintainerTeam?: _maintainerTeam;
  goalIds?: string[];
  experiments?: Experiments;
  customProperties?: CustomProperties;
  archived?: boolean;
  archivedDate?: number;
  defaults?: Defaults;
  environments: EnvironmentArrayLike<EnvironmentItem>;
  //   metricKey?: string;
  //   _metric?: _metric;
  //   _environmentSettings?: _environmentSettings;
}

export interface EnvironmentArrayLike<EnvironmentItem> {
  [key: string]: EnvironmentItem;
}

interface EnvironmentItem {
  _environmentName: string;
  _site: _site;
  _summary: _summary;
  archived: boolean;
  lastModified: number;
  on: boolean;
  salt: string;
  sel: string;
  trackEvents: boolean;
  trackEventsFallthrough: boolean;
  version: number;
}

export interface ClientSideAvailability {
  usingMobileKey: boolean;
  usingEnvironmentId: boolean;
}
export interface VariationsItem {
  _id: string;
  value: boolean;
}
export interface _links {
  parent?: Parent;
  self?: Self;
  roles?: Roles;
}
export interface Parent {
  href: string;
  type: string;
}
export interface Self {
  href: string;
  type: string;
}
export interface _maintainer {
  _links: _links;
  _id: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
  email: string | null;
}
export interface _maintainerTeam {
  key: string;
  name: string;
  _links: _links;
}
export interface Roles {
  href: string;
  type: string;
}
export interface Experiments {
  baselineIdx: number;
  items: ItemsItem[];
}
// export interface _metric {
//   experimentCount: number;
//   _id: string;
//   key: string;
//   name: string;
//   kind: string;
//   _attachedFlagCount: number;
//   _links: _links;
//   _site: _site;
//   _access: _access;
//   tags: any[];
//   _creationDate: number;
//   lastModified: LastModified;
//   maintainerId: string;
//   _maintainer: _maintainer;
//   description: string;
//   isNumeric: boolean;
//   successCriteria: string;
//   unit: string;
//   eventKey: string;
//   randomizationUnits: string[];
//   unitAggregationType: string;
//   analysisType: string;
//   percentileValue: number;
//   eventDefault: EventDefault;
// }
export interface _site {
  href: null | string;
  type: null | string;
}
// export interface _access {
//   denied: any[];
//   allowed: any[];
// }
// export interface LastModified {
//   date: null;
// }
// export interface EventDefault {
//   disabled: null;
//   value: null;
// }
// export interface _environmentSettings {
//   property1: Property1;
//   property2: Property2;
// }
// export interface Property1 {
//   startDate?: null;
//   stopDate?: null;
//   enabledPeriods?: any[];
//   name?: string;
//   value?: string[];
// }
// export interface Property2 {
//   startDate?: null;
//   stopDate?: null;
//   enabledPeriods?: any[];
//   name?: string;
//   value?: string[];
// }
export interface CustomProperties {
  name: string;
  value: string;
}
export interface Defaults {
  onVariation: number;
  offVariation: number;
}
export interface Environments {
  _environmentName: string;
  _site: _site;
  _summary: _summary;
  archived: boolean;
  contextTargets: ContextTargetsItem[];
  fallthrough: Fallthrough;
  lastModified: number;
  offVariation: number;
  on: boolean;
  prerequisites: prerequisitesItem[];
  rules: rulesItem[];
  salt: string;
  sel: string;
  targets: TargetsItem[];
  trackEvents: boolean;
  trackEventsFallthrough: boolean;
  version: number;
}
export interface prerequisitesItem {
  key: string;
  variation: number;
}
export interface rulesItem {
  _id: string;
  variations: number;
}
export interface _summary {
  prerequisites: number;
  variations: Variations;
}
export interface Variations {
  rules: number;
  nullRules: number;
  targets: number;
  contextTargets: number;
  isFallthrough: boolean;
  isOff: boolean;
  rollout: number;
  bucketBy: string;
}
// interface 0 {
//     contextTargets: number;
//     isFallthrough: boolean;
//     nullRules: number;
//     rules: number;
//     targets: number;
// }
// interface 1 {
//     isOff: boolean;
//     nullRules: number;
//     rules: number;
//     targets: number;
// }
export interface ContextTargetsItem {
  contextKind: string;
  values: string[];
  variation: number;
}
export interface Fallthrough {
  variation: number;
}
export interface TargetsItem {
  contextKind: string;
  values: string[];
  variation: number;
}
