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
}

export interface FlagDefaults {
  href: string;
  type: string;
}
export interface DefaultClientSideAvailability {
  usingMobileKey: boolean;
  usingEnvironmentId: boolean;
}
