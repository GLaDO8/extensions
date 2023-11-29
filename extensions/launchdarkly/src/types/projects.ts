export interface Projects {
  _links: string;
  items: ItemsItem[];
  totalCount: number;
}

export interface ItemsItem {
  _links: string;
  _id: string;
  key: string;
  includeInSnippetByDefault: boolean;
  defaultClientSideAvailability: DefaultClientSideAvailability;
  name: string;
  tags: string[];
  environments?: Environments;
}

export interface Environments {
  _links?: string;
  totalCount?: number;
  items?: EnvironmentItem[];
}

export interface EnvironmentItem {
  _links: string;
  _id: string;
  key: string;
  name: string;
  tags: string[];
  _pubnub?: _pubnub;
  apiKey?: string;
  mobileKey?: string;
  color?: string;
  defaultTtl?: number;
  secureMode?: boolean;
  defaultTrackEvents?: boolean;
  requireComments?: boolean;
  confirmChanges?: boolean;
  approvalSettings?: ApprovalSettings;
}

export interface FlagDefaults {
  href: string;
  type: string;
}
export interface DefaultClientSideAvailability {
  usingMobileKey: boolean;
  usingEnvironmentId: boolean;
}

interface _pubnub {
  channel: string;
  cipherKey: string;
}
interface ApprovalSettings {
  required: boolean;
  bypassApprovalsForPendingChanges: boolean;
  minNumApprovals: number;
  canReviewOwnRequest: boolean;
  canApplyDeclinedChanges: boolean;
  serviceKind: string;
  serviceConfig: string;
  requiredApprovalTags: string[];
}
