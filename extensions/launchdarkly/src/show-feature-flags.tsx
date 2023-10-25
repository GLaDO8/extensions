import { List, Icon } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { FeatureFlag } from "./types/featureFlags";
import { baseURL, getAccessToken } from "./utils/api";

export default function command() {
  const { isLoading, data } = useFetch(`${baseURL}/flags/default`, {
    headers: { Authorization: getAccessToken() },
    async parseResponse(response) {
      return (await response.json()) as FeatureFlag;
    },
    keepPreviousData: true,
  });

  return (
    <List isLoading={isLoading}>
      {data?.items.map((featureFlag) => (
        <List.Item
          key={featureFlag.key}
          title={featureFlag.name || "unknown"}
          subtitle={featureFlag.description}
          detail={<List.Item.Detail.Metadata.Label title="Status" icon={Icon.Checkmark} />}
        />
      ))}
    </List>
  );
}
