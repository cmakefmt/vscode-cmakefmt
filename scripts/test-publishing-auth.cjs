// SPDX-FileCopyrightText: Copyright 2026 Puneet Matharu
// SPDX-License-Identifier: MIT OR Apache-2.0

const assert = require("node:assert/strict");
const test = require("node:test");
const { ClientSecretCredential } = require("@azure/identity");
const { createHttpHeaders } = require("@azure/core-rest-pipeline");

// Exercise the Identity/MSAL boundary affected by the security override.
// All HTTP requests use this fake transport; no real credentials are used.
test("Azure Identity acquires and caches a token with the patched MSAL", async () => {
  const tenant = "11111111-1111-4111-8111-111111111111";
  const authority = `https://login.microsoftonline.com/${tenant}`;
  let tokenRequests = 0;
  const credential = new ClientSecretCredential(tenant, "test-client", "test-secret", {
    disableInstanceDiscovery: true,
    httpClient: {
      async sendRequest(request) {
        assert.equal(new URL(request.url).origin, "https://login.microsoftonline.com");
        let body;
        if (request.method === "GET" && request.url.endsWith("/.well-known/openid-configuration")) {
          body = {
            issuer: `${authority}/v2.0`,
            authorization_endpoint: `${authority}/oauth2/v2.0/authorize`,
            token_endpoint: `${authority}/oauth2/v2.0/token`,
            jwks_uri: `${authority}/discovery/v2.0/keys`,
            end_session_endpoint: `${authority}/oauth2/v2.0/logout`,
          };
        } else {
          assert.equal(request.method, "POST");
          assert.equal(new URL(request.url).pathname, `/${tenant}/oauth2/v2.0/token`);
          const parameters = new URLSearchParams(request.body);
          assert.equal(parameters.get("grant_type"), "client_credentials");
          assert.equal(parameters.get("client_id"), "test-client");
          assert.equal(parameters.get("client_secret"), "test-secret");
          tokenRequests += 1;
          body = {
            access_token: "offline-test-token",
            token_type: "Bearer",
            expires_in: 3600,
            ext_expires_in: 3600,
          };
        }
        return {
          request,
          status: 200,
          headers: createHttpHeaders({ "content-type": "application/json" }),
          bodyAsText: JSON.stringify(body),
        };
      },
    },
  });
  const scope = "499b84ac-1321-427f-aa17-267ca6975798/.default";
  const token = await credential.getToken(scope);
  assert.equal(token.token, "offline-test-token");
  assert.ok(token.expiresOnTimestamp > Date.now());
  assert.equal((await credential.getToken(scope)).token, token.token);
  assert.equal(tokenRequests, 1);
});
