import { List, Icon } from "@raycast/api";
import fetch from "node-fetch";
import { FeatureFlag } from "./types/featureFlags";
import { baseURL, getAccessToken } from "./utils/api";
import { useState, useEffect } from "react";
import { useCachedState } from "@raycast/utils";
import { Projects } from "./types/projects";

export default function command() {
  const [featureFlags, setFeatureFlags] = useCachedState<FeatureFlag>("featureFlags");
  const [currProj, setCurrProj] = useCachedState<string>("current-project");
  const [currEnv, setCurrEnv] = useCachedState<string>("current-project");
  const [filterVal, setFilterVal] = useState<string>("");
  const [projData, setProjData] = useCachedState<Projects>("projects");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getFeatureFlags() {
      setIsLoading(true);
      const projResponse = await fetch(`${baseURL}/projects?expand=environments&sort=name`, {
        headers: { Authorization: getAccessToken() },
      });

      const projData = (await projResponse.json()) as Projects;
      setProjData(projData);
      if (currProj === undefined) {
        setCurrProj(projData?.items?.[0].key);
      }
      const featureFlagResponse = await fetch(
        `${
          filterVal === ""
            ? `${baseURL}/flags/${projData?.items?.[0].key}?filter=status:active&sort=-creationDate`
            : `${baseURL}/flags/${filterVal.split("$$")[0]}?filter=status:active&filterEnv=${
                filterVal.split("$$")[1]
              }&sort=-creationDate`
        }`,
        {
          headers: { Authorization: getAccessToken() },
        },
      );

      const featureFlagData = (await featureFlagResponse.json()) as FeatureFlag;
      console.log(featureFlagData?.items?.[0].environments?.length);
      // if (currEnv === undefined) {
      //   setCurrEnv(featureFlagData?.items?.[0].environments?.[0]._environmentName);
      // }
      setFeatureFlags(featureFlagData);
      setIsLoading(false);
    }
    getFeatureFlags();
  }, [filterVal]);

  function onChangeEnvironment(newValue: string) {
    setFilterVal(newValue);
  }
  return (
    <List
      isLoading={featureFlags === undefined || isLoading}
      searchBarPlaceholder="Search Feature Flags"
      searchBarAccessory={
        <List.Dropdown
          tooltip="Projects and Environments Filter"
          isLoading={projData === undefined}
          onChange={onChangeEnvironment}
        >
          {projData?.items.map((project) => (
            <List.Dropdown.Section title={project.name} key={project.key}>
              {project.environments?.items?.map((env) => (
                <List.Dropdown.Item key={env.key} title={env.name} value={`${project.key}$$${env.key}`} />
              ))}
            </List.Dropdown.Section>
          ))}
        </List.Dropdown>
      }
    >
      {featureFlags?.items.map((featureFlag) => (
        <List.Item
          key={featureFlag.key}
          title={featureFlag.name || "unknown"}
          subtitle={featureFlag.description}
          detail={
            <List.Item.Detail
              metadata={
                <List.Item.Detail.Metadata>
                  <List.Item.Detail.Metadata.Label
                    title="Status"
                    icon={Icon.Checkmark}
                    // text={featureFlag.environments?.[currEnv!].on ? "On" : "Off"}
                  />
                  <List.Item.Detail.Metadata.Label title="Last Modified" icon={Icon.Clock} />
                </List.Item.Detail.Metadata>
              }
            />
          }
        />
      ))}
    </List>
  );
}
// projData?.items?.[0].environments?.items?.[0].key
