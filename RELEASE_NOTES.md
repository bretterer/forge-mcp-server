# Release Notes

## v0.1.0 - 2025-06-01

Initial release of the Laravel Forge MCP Server.

### 🚀 Features

- MCP server implementation for Laravel Forge API integration
- Support for managing Laravel Forge servers and sites
- Deployment management capabilities
- Server monitoring tools

### 📚 Tools Included

- `list_servers` - List all Laravel Forge servers
- `get_server` - Get details of a specific server
- `list_sites` - List all sites on a server
- `get_site` - Get details of a specific site
- `deploy_site` - Deploy a site
- `get_deployments` - Get deployment history for a site
- `get_deployment_script` - Get the deployment script for a site
- `update_deployment_script` - Update the deployment script for a site
- `toggle_quick_deploy` - Enable or disable quick deploy for a site
- `reboot_server` - Reboot a server
- `get_server_load` - Get server load metrics
- `reset_deployment_state` - Reset deployment state for a site

### 📦 Dependencies

- Node.js >=18.0.0
- @modelcontextprotocol/sdk v0.5.0

### 🔧 Setup Requirements

- Laravel Forge API key (set as FORGE_API_KEY environment variable)

## Installation

```bash
npm install @bretterer/forge-mcp-server
```

## Usage

```bash
# Set your API key
export FORGE_API_KEY=your_forge_api_key

# Run the server
npx forge-mcp-server
```

For more information, see the [README.md](README.md) file.
