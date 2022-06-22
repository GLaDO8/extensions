import { OAuth } from "@raycast/api";
import fetch from "node-fetch";
import { User } from "../interfaces";

// Register a new OAuth app via https://developer.twitter.com/en/portal/dashboard
// Select OAuth 2.0
// As type of app choose: Native App
// For the redirect URL enter: https://raycast.com/redirect
// For the website URL enter: https://raycast.com
const clientId = "QTKDBYq4bik2cIbo6laSCA9qFidPmFukjvIrK22Q";

const client = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "Spitwise",
  providerIcon: "bg-primary.png",
  providerId: "splitwise",
  description: "Connect your Splitwise account.",
});

// Authorization

export async function authorize(): Promise<void> {
  const tokenSet = await client.getTokens();
  if (tokenSet?.accessToken) {
    if (tokenSet.refreshToken && tokenSet.isExpired()) {
      await client.setTokens(await refreshTokens(tokenSet.refreshToken));
    }
    return;
  }

  const authRequest = await client.authorizationRequest({
    endpoint: "https://secure.splitwise.com/oauth/authorize",
    clientId: clientId,
    scope: "",
  });
  console.log("authorisation started");

  const { authorizationCode } = await client.authorize(authRequest);
  console.log(authorizationCode);
  await client.setTokens(await fetchTokens(authRequest, authorizationCode));
  console.log("authorisation done");
}

export async function fetchTokens(
  authRequest: OAuth.AuthorizationRequest,
  authCode: string
): Promise<OAuth.TokenResponse> {
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("code", authCode);
  params.append("code_verifier", authRequest.codeVerifier);
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", authRequest.redirectURI);

  const response = await fetch("https://secure.splitwise.com/oauth/token", { method: "POST", body: params });
  if (!response.ok) {
    console.error("fetch tokens error:", await response.text());
    throw new Error(response.statusText);
  }
  console.log("token fetch done");

  return (await response.json()) as OAuth.TokenResponse;
}

async function refreshTokens(refreshToken: string): Promise<OAuth.TokenResponse> {
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("refresh_token", refreshToken);
  params.append("grant_type", "refresh_token");

  const response = await fetch("https://secure.splitwise.com/oauth/token", { method: "POST", body: params });
  if (!response.ok) {
    console.error("refresh tokens error:", await response.text());
    throw new Error(response.statusText);
  }

  const tokenResponse = (await response.json()) as OAuth.TokenResponse;
  tokenResponse.refresh_token = tokenResponse.refresh_token ?? refreshToken;
  return tokenResponse;
}

// API

export async function fetchItems(): Promise<User> {
  // const params = new URLSearchParams();
  // params.append("query", "raycast");
  console.log("running fetch items");
  const response = await fetch("https://secure.splitwise.com/api/v3.0/get_current_user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await client.getTokens())?.accessToken}`,
    },
  });
  if (!response.ok) {
    console.error("fetch items error:", await response.text());
    throw new Error(response.statusText);
  }
  const json = (await response.json()) as User;
  return json;
}
