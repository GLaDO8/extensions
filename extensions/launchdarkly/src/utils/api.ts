import { getPreferenceValues } from "@raycast/api";
export const baseURL = "https://app.launchdarkly.com/api/v2/";

export function getAccessToken() {
  const prefs = getPreferenceValues();
  return prefs["access-token"];
}
