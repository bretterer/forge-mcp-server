#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

interface ForgeServer {
  id: number;
  name: string;
  ip_address: string;
  provider: string;
  region: string;
  size: string;
  status: string;
  created_at: string;
}

interface ForgeSite {
  id: number;
  name: string;
  directory: string;
  status: string;
  repository_provider: string;
  repository_name: string;
  repository_branch: string;
  deployment_status: string;
  quick_deploy: boolean;
  created_at: string;
}

interface ForgeDeployment {
  id: number;
  commit_hash: string;
  commit_message: string;
  commit_author: string;
  status: string;
  started_at: string;
  ended_at: string;
}

class ForgeAPIClient {
  private apiKey: string;
  private baseUrl = "https://forge.laravel.com/api/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, method: string = "GET", body?: any) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new McpError(
        ErrorCode.InternalError,
        `Forge API request failed: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  async getServers(): Promise<ForgeServer[]> {
    const response = await this.makeRequest("/servers");
    return response.servers;
  }

  async getServer(serverId: number): Promise<ForgeServer> {
    const response = await this.makeRequest(`/servers/${serverId}`);
    return response.server;
  }

  async getSites(serverId: number): Promise<ForgeSite[]> {
    const response = await this.makeRequest(`/servers/${serverId}/sites`);
    return response.sites;
  }

  async getSite(serverId: number, siteId: number): Promise<ForgeSite> {
    const response = await this.makeRequest(`/servers/${serverId}/sites/${siteId}`);
    return response.site;
  }

  async getDeployments(serverId: number, siteId: number): Promise<ForgeDeployment[]> {
    const response = await this.makeRequest(`/servers/${serverId}/sites/${siteId}/deployment-history`);
    return response.deployments;
  }

  async deploySite(serverId: number, siteId: number): Promise<void> {
    await this.makeRequest(`/servers/${serverId}/sites/${siteId}/deployment/deploy`, "POST");
  }

  async resetDeploymentState(serverId: number, siteId: number): Promise<void> {
    await this.makeRequest(`/servers/${serverId}/sites/${siteId}/deployment/reset`, "POST");
  }

  async getDeploymentScript(serverId: number, siteId: number): Promise<string> {
    const response = await this.makeRequest(`/servers/${serverId}/sites/${siteId}/deployment/script`);
    return response.content;
  }

  async updateDeploymentScript(serverId: number, siteId: number, content: string): Promise<void> {
    await this.makeRequest(`/servers/${serverId}/sites/${siteId}/deployment/script`, "PUT", {
      content: content,
    });
  }

  async enableQuickDeploy(serverId: number, siteId: number): Promise<void> {
    await this.makeRequest(`/servers/${serverId}/sites/${siteId}/deployment`, "POST");
  }

  async disableQuickDeploy(serverId: number, siteId: number): Promise<void> {
    await this.makeRequest(`/servers/${serverId}/sites/${siteId}/deployment`, "DELETE");
  }

  async rebootServer(serverId: number): Promise<void> {
    await this.makeRequest(`/servers/${serverId}/reboot`, "POST");
  }

  async getServerLoad(serverId: number): Promise<any> {
    const response = await this.makeRequest(`/servers/${serverId}/load`);
    return response;
  }
}

class ForgeServer {
  private server: Server;
  private forgeClient: ForgeAPIClient;

  constructor() {
    this.server = new Server(
      {
        name: "@bretterer/forge-mcp-server",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    const apiKey = process.env.FORGE_API_KEY;
    if (!apiKey) {
      throw new Error("FORGE_API_KEY environment variable is required");
    }

    this.forgeClient = new ForgeAPIClient(apiKey);
    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "list_servers",
            description: "List all Laravel Forge servers",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "get_server",
            description: "Get details of a specific server",
            inputSchema: {
              type: "object",
              properties: {
                serverId: {
                  type: "number",
                  description: "The ID of the server",
                },
              },
              required: ["serverId"],
            },
          },
          {
            name: "list_sites",
            description: "List all sites on a server",
            inputSchema: {
              type: "object",
              properties: {
                serverId: {
                  type: "number",
                  description: "The ID of the server",
                },
              },
              required: ["serverId"],
            },
          },
          {
            name: "get_site",
            description: "Get details of a specific site",
            inputSchema: {
              type: "object",
              properties: {
                serverId: {
                  type: "number",
                  description: "The ID of the server",
                },
                siteId: {
                  type: "number",
                  description: "The ID of the site",
                },
              },
              required: ["serverId", "siteId"],
            },
          },
          {
            name: "deploy_site",
            description: "Deploy a site",
            inputSchema: {
              type: "object",
              properties: {
                serverId: {
                  type: "number",
                  description: "The ID of the server",
                },
                siteId: {
                  type: "number",
                  description: "The ID of the site",
                },
              },
              required: ["serverId", "siteId"],
            },
          },
          {
            name: "get_deployments",
            description: "Get deployment history for a site",
            inputSchema: {
              type: "object",
              properties: {
                serverId: {
                  type: "number",
                  description: "The ID of the server",
                },
                siteId: {
                  type: "number",
                  description: "The ID of the site",
                },
              },
              required: ["serverId", "siteId"],
            },
          },
          {
            name: "get_deployment_script",
            description: "Get the deployment script for a site",
            inputSchema: {
              type: "object",
              properties: {
                serverId: {
                  type: "number",
                  description: "The ID of the server",
                },
                siteId: {
                  type: "number",
                  description: "The ID of the site",
                },
              },
              required: ["serverId", "siteId"],
            },
          },
          {
            name: "update_deployment_script",
            description: "Update the deployment script for a site",
            inputSchema: {
              type: "object",
              properties: {
                serverId: {
                  type: "number",
                  description: "The ID of the server",
                },
                siteId: {
                  type: "number",
                  description: "The ID of the site",
                },
                content: {
                  type: "string",
                  description: "The new deployment script content",
                },
              },
              required: ["serverId", "siteId", "content"],
            },
          },
          {
            name: "toggle_quick_deploy",
            description: "Enable or disable quick deploy for a site",
            inputSchema: {
              type: "object",
              properties: {
                serverId: {
                  type: "number",
                  description: "The ID of the server",
                },
                siteId: {
                  type: "number",
                  description: "The ID of the site",
                },
                enable: {
                  type: "boolean",
                  description: "Whether to enable or disable quick deploy",
                },
              },
              required: ["serverId", "siteId", "enable"],
            },
          },
          {
            name: "reboot_server",
            description: "Reboot a server",
            inputSchema: {
              type: "object",
              properties: {
                serverId: {
                  type: "number",
                  description: "The ID of the server",
                },
              },
              required: ["serverId"],
            },
          },
          {
            name: "get_server_load",
            description: "Get server load metrics",
            inputSchema: {
              type: "object",
              properties: {
                serverId: {
                  type: "number",
                  description: "The ID of the server",
                },
              },
              required: ["serverId"],
            },
          },
          {
            name: "reset_deployment_state",
            description: "Reset deployment state for a site",
            inputSchema: {
              type: "object",
              properties: {
                serverId: {
                  type: "number",
                  description: "The ID of the server",
                },
                siteId: {
                  type: "number",
                  description: "The ID of the site",
                },
              },
              required: ["serverId", "siteId"],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "list_servers": {
            const servers = await this.forgeClient.getServers();
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(servers, null, 2),
                },
              ],
            };
          }

          case "get_server": {
            const { serverId } = args as { serverId: number };
            const server = await this.forgeClient.getServer(serverId);
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(server, null, 2),
                },
              ],
            };
          }

          case "list_sites": {
            const { serverId } = args as { serverId: number };
            const sites = await this.forgeClient.getSites(serverId);
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(sites, null, 2),
                },
              ],
            };
          }

          case "get_site": {
            const { serverId, siteId } = args as { serverId: number; siteId: number };
            const site = await this.forgeClient.getSite(serverId, siteId);
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(site, null, 2),
                },
              ],
            };
          }

          case "deploy_site": {
            const { serverId, siteId } = args as { serverId: number; siteId: number };
            await this.forgeClient.deploySite(serverId, siteId);
            return {
              content: [
                {
                  type: "text",
                  text: `Deployment initiated for site ${siteId} on server ${serverId}`,
                },
              ],
            };
          }

          case "get_deployments": {
            const { serverId, siteId } = args as { serverId: number; siteId: number };
            const deployments = await this.forgeClient.getDeployments(serverId, siteId);
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(deployments, null, 2),
                },
              ],
            };
          }

          case "get_deployment_script": {
            const { serverId, siteId } = args as { serverId: number; siteId: number };
            const script = await this.forgeClient.getDeploymentScript(serverId, siteId);
            return {
              content: [
                {
                  type: "text",
                  text: script,
                },
              ],
            };
          }

          case "update_deployment_script": {
            const { serverId, siteId, content } = args as {
              serverId: number;
              siteId: number;
              content: string;
            };
            await this.forgeClient.updateDeploymentScript(serverId, siteId, content);
            return {
              content: [
                {
                  type: "text",
                  text: `Deployment script updated for site ${siteId} on server ${serverId}`,
                },
              ],
            };
          }

          case "toggle_quick_deploy": {
            const { serverId, siteId, enable } = args as {
              serverId: number;
              siteId: number;
              enable: boolean;
            };
            if (enable) {
              await this.forgeClient.enableQuickDeploy(serverId, siteId);
            } else {
              await this.forgeClient.disableQuickDeploy(serverId, siteId);
            }
            return {
              content: [
                {
                  type: "text",
                  text: `Quick deploy ${enable ? "enabled" : "disabled"} for site ${siteId} on server ${serverId}`,
                },
              ],
            };
          }

          case "reboot_server": {
            const { serverId } = args as { serverId: number };
            await this.forgeClient.rebootServer(serverId);
            return {
              content: [
                {
                  type: "text",
                  text: `Server ${serverId} reboot initiated`,
                },
              ],
            };
          }

          case "get_server_load": {
            const { serverId } = args as { serverId: number };
            const load = await this.forgeClient.getServerLoad(serverId);
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(load, null, 2),
                },
              ],
            };
          }

          case "reset_deployment_state": {
            const { serverId, siteId } = args as { serverId: number; siteId: number };
            await this.forgeClient.resetDeploymentState(serverId, siteId);
            return {
              content: [
                {
                  type: "text",
                  text: `Deployment state reset for site ${siteId} on server ${serverId}`,
                },
              ],
            };
          }

          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`
            );
        }
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }
        throw new McpError(
          ErrorCode.InternalError,
          `Error executing tool ${name}: ${error}`
        );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Laravel Forge MCP server running on stdio");
  }
}

const server = new ForgeServer();
server.run().catch(console.error);