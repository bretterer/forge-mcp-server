#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
var stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
var types_js_1 = require("@modelcontextprotocol/sdk/types.js");
var ForgeAPIClient = /** @class */ (function () {
    function ForgeAPIClient(apiKey) {
        this.baseUrl = "https://forge.laravel.com/api/v1";
        this.apiKey = apiKey;
    }
    ForgeAPIClient.prototype.makeRequest = function (endpoint_1) {
        return __awaiter(this, arguments, void 0, function (endpoint, method, body) {
            var url, headers, response;
            if (method === void 0) { method = "GET"; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.baseUrl).concat(endpoint);
                        headers = {
                            "Authorization": "Bearer ".concat(this.apiKey),
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        };
                        return [4 /*yield*/, fetch(url, {
                                method: method,
                                headers: headers,
                                body: body ? JSON.stringify(body) : undefined,
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, "Forge API request failed: ".concat(response.status, " ").concat(response.statusText));
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    ForgeAPIClient.prototype.getServers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.servers];
                }
            });
        });
    };
    ForgeAPIClient.prototype.getServer = function (serverId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers/".concat(serverId))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.server];
                }
            });
        });
    };
    ForgeAPIClient.prototype.getSites = function (serverId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers/".concat(serverId, "/sites"))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.sites];
                }
            });
        });
    };
    ForgeAPIClient.prototype.getSite = function (serverId, siteId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers/".concat(serverId, "/sites/").concat(siteId))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.site];
                }
            });
        });
    };
    ForgeAPIClient.prototype.getDeployments = function (serverId, siteId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers/".concat(serverId, "/sites/").concat(siteId, "/deployment-history"))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.deployments];
                }
            });
        });
    };
    ForgeAPIClient.prototype.deploySite = function (serverId, siteId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers/".concat(serverId, "/sites/").concat(siteId, "/deployment/deploy"), "POST")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ForgeAPIClient.prototype.resetDeploymentState = function (serverId, siteId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers/".concat(serverId, "/sites/").concat(siteId, "/deployment/reset"), "POST")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ForgeAPIClient.prototype.getDeploymentScript = function (serverId, siteId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers/".concat(serverId, "/sites/").concat(siteId, "/deployment/script"))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.content];
                }
            });
        });
    };
    ForgeAPIClient.prototype.updateDeploymentScript = function (serverId, siteId, content) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers/".concat(serverId, "/sites/").concat(siteId, "/deployment/script"), "PUT", {
                            content: content,
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ForgeAPIClient.prototype.enableQuickDeploy = function (serverId, siteId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers/".concat(serverId, "/sites/").concat(siteId, "/deployment"), "POST")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ForgeAPIClient.prototype.disableQuickDeploy = function (serverId, siteId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers/".concat(serverId, "/sites/").concat(siteId, "/deployment"), "DELETE")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ForgeAPIClient.prototype.rebootServer = function (serverId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers/".concat(serverId, "/reboot"), "POST")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ForgeAPIClient.prototype.getServerLoad = function (serverId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRequest("/servers/".concat(serverId, "/load"))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return ForgeAPIClient;
}());
var ForgeServer = /** @class */ (function () {
    function ForgeServer() {
        this.server = new index_js_1.Server({
            name: "@bretterer/forge-mcp-server",
            version: "0.1.0",
        }, {
            capabilities: {
                tools: {},
            },
        });
        var apiKey = process.env.FORGE_API_KEY;
        if (!apiKey) {
            throw new Error("FORGE_API_KEY environment variable is required");
        }
        this.forgeClient = new ForgeAPIClient(apiKey);
        this.setupToolHandlers();
    }
    ForgeServer.prototype.setupToolHandlers = function () {
        var _this = this;
        this.server.setRequestHandler(types_js_1.ListToolsRequestSchema, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
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
                    }];
            });
        }); });
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, function (request) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name, args, _b, servers, serverId, server_1, serverId, sites, _c, serverId, siteId, site, _d, serverId, siteId, _e, serverId, siteId, deployments, _f, serverId, siteId, script, _g, serverId, siteId, content, _h, serverId, siteId, enable, serverId, serverId, load, _j, serverId, siteId, error_1;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _a = request.params, name = _a.name, args = _a.arguments;
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 31, , 32]);
                        _b = name;
                        switch (_b) {
                            case "list_servers": return [3 /*break*/, 2];
                            case "get_server": return [3 /*break*/, 4];
                            case "list_sites": return [3 /*break*/, 6];
                            case "get_site": return [3 /*break*/, 8];
                            case "deploy_site": return [3 /*break*/, 10];
                            case "get_deployments": return [3 /*break*/, 12];
                            case "get_deployment_script": return [3 /*break*/, 14];
                            case "update_deployment_script": return [3 /*break*/, 16];
                            case "toggle_quick_deploy": return [3 /*break*/, 18];
                            case "reboot_server": return [3 /*break*/, 23];
                            case "get_server_load": return [3 /*break*/, 25];
                            case "reset_deployment_state": return [3 /*break*/, 27];
                        }
                        return [3 /*break*/, 29];
                    case 2: return [4 /*yield*/, this.forgeClient.getServers()];
                    case 3:
                        servers = _k.sent();
                        return [2 /*return*/, {
                                content: [
                                    {
                                        type: "text",
                                        text: JSON.stringify(servers, null, 2),
                                    },
                                ],
                            }];
                    case 4:
                        serverId = args.serverId;
                        return [4 /*yield*/, this.forgeClient.getServer(serverId)];
                    case 5:
                        server_1 = _k.sent();
                        return [2 /*return*/, {
                                content: [
                                    {
                                        type: "text",
                                        text: JSON.stringify(server_1, null, 2),
                                    },
                                ],
                            }];
                    case 6:
                        serverId = args.serverId;
                        return [4 /*yield*/, this.forgeClient.getSites(serverId)];
                    case 7:
                        sites = _k.sent();
                        return [2 /*return*/, {
                                content: [
                                    {
                                        type: "text",
                                        text: JSON.stringify(sites, null, 2),
                                    },
                                ],
                            }];
                    case 8:
                        _c = args, serverId = _c.serverId, siteId = _c.siteId;
                        return [4 /*yield*/, this.forgeClient.getSite(serverId, siteId)];
                    case 9:
                        site = _k.sent();
                        return [2 /*return*/, {
                                content: [
                                    {
                                        type: "text",
                                        text: JSON.stringify(site, null, 2),
                                    },
                                ],
                            }];
                    case 10:
                        _d = args, serverId = _d.serverId, siteId = _d.siteId;
                        return [4 /*yield*/, this.forgeClient.deploySite(serverId, siteId)];
                    case 11:
                        _k.sent();
                        return [2 /*return*/, {
                                content: [
                                    {
                                        type: "text",
                                        text: "Deployment initiated for site ".concat(siteId, " on server ").concat(serverId),
                                    },
                                ],
                            }];
                    case 12:
                        _e = args, serverId = _e.serverId, siteId = _e.siteId;
                        return [4 /*yield*/, this.forgeClient.getDeployments(serverId, siteId)];
                    case 13:
                        deployments = _k.sent();
                        return [2 /*return*/, {
                                content: [
                                    {
                                        type: "text",
                                        text: JSON.stringify(deployments, null, 2),
                                    },
                                ],
                            }];
                    case 14:
                        _f = args, serverId = _f.serverId, siteId = _f.siteId;
                        return [4 /*yield*/, this.forgeClient.getDeploymentScript(serverId, siteId)];
                    case 15:
                        script = _k.sent();
                        return [2 /*return*/, {
                                content: [
                                    {
                                        type: "text",
                                        text: script,
                                    },
                                ],
                            }];
                    case 16:
                        _g = args, serverId = _g.serverId, siteId = _g.siteId, content = _g.content;
                        return [4 /*yield*/, this.forgeClient.updateDeploymentScript(serverId, siteId, content)];
                    case 17:
                        _k.sent();
                        return [2 /*return*/, {
                                content: [
                                    {
                                        type: "text",
                                        text: "Deployment script updated for site ".concat(siteId, " on server ").concat(serverId),
                                    },
                                ],
                            }];
                    case 18:
                        _h = args, serverId = _h.serverId, siteId = _h.siteId, enable = _h.enable;
                        if (!enable) return [3 /*break*/, 20];
                        return [4 /*yield*/, this.forgeClient.enableQuickDeploy(serverId, siteId)];
                    case 19:
                        _k.sent();
                        return [3 /*break*/, 22];
                    case 20: return [4 /*yield*/, this.forgeClient.disableQuickDeploy(serverId, siteId)];
                    case 21:
                        _k.sent();
                        _k.label = 22;
                    case 22: return [2 /*return*/, {
                            content: [
                                {
                                    type: "text",
                                    text: "Quick deploy ".concat(enable ? "enabled" : "disabled", " for site ").concat(siteId, " on server ").concat(serverId),
                                },
                            ],
                        }];
                    case 23:
                        serverId = args.serverId;
                        return [4 /*yield*/, this.forgeClient.rebootServer(serverId)];
                    case 24:
                        _k.sent();
                        return [2 /*return*/, {
                                content: [
                                    {
                                        type: "text",
                                        text: "Server ".concat(serverId, " reboot initiated"),
                                    },
                                ],
                            }];
                    case 25:
                        serverId = args.serverId;
                        return [4 /*yield*/, this.forgeClient.getServerLoad(serverId)];
                    case 26:
                        load = _k.sent();
                        return [2 /*return*/, {
                                content: [
                                    {
                                        type: "text",
                                        text: JSON.stringify(load, null, 2),
                                    },
                                ],
                            }];
                    case 27:
                        _j = args, serverId = _j.serverId, siteId = _j.siteId;
                        return [4 /*yield*/, this.forgeClient.resetDeploymentState(serverId, siteId)];
                    case 28:
                        _k.sent();
                        return [2 /*return*/, {
                                content: [
                                    {
                                        type: "text",
                                        text: "Deployment state reset for site ".concat(siteId, " on server ").concat(serverId),
                                    },
                                ],
                            }];
                    case 29: throw new types_js_1.McpError(types_js_1.ErrorCode.MethodNotFound, "Unknown tool: ".concat(name));
                    case 30: return [3 /*break*/, 32];
                    case 31:
                        error_1 = _k.sent();
                        if (error_1 instanceof types_js_1.McpError) {
                            throw error_1;
                        }
                        throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, "Error executing tool ".concat(name, ": ").concat(error_1));
                    case 32: return [2 /*return*/];
                }
            });
        }); });
    };
    ForgeServer.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var transport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transport = new stdio_js_1.StdioServerTransport();
                        return [4 /*yield*/, this.server.connect(transport)];
                    case 1:
                        _a.sent();
                        console.error("Laravel Forge MCP server running on stdio");
                        return [2 /*return*/];
                }
            });
        });
    };
    return ForgeServer;
}());
var server = new ForgeServer();
server.run().catch(console.error);
