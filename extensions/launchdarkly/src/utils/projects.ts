import { useFetch } from "@raycast/utils";
import { baseURL, getAccessToken } from "./api";
import { Projects } from "../types/projects";

export function getProjects() {
  const { isLoading, data, revalidate } = useFetch(`${baseURL}/projects`, {
    headers: { Authorization: getAccessToken() },
    async parseResponse(response) {
      return (await response.json()) as Projects;
    },
  });

  return { isLoading, data, revalidate };
}
