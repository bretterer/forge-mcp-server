# Laravel Forge MCP Server

A Model Context Protocol (MCP) server for interacting with Laravel Forge API. This server enables AI assistants to manage Laravel Forge servers, sites, and deployments.

## Features

- List and get details of Laravel Forge servers
- Manage sites on Laravel Forge servers
- Deploy sites and manage deployment scripts
- Toggle quick deploy functionality
- View deployment history
- Reboot servers and check server load

## Installation

```bash
npm install @bretterer/forge-mcp-server
```

## Usage

### Prerequisites

You need a Laravel Forge API key to use this server. You can get one from your [Laravel Forge account settings](https://forge.laravel.com/user/profile#/api).

### Environment Variables

Set your Laravel Forge API key as an environment variable:

```bash
export FORGE_API_KEY=your_forge_api_key
```

### Running the Server

```bash
npx forge-mcp-server
```

Or add it to your project:

```javascript
import { ForgeServer } from '@bretterer/forge-mcp-server';

const server = new ForgeServer();
server.run().catch(console.error);
```

## Available Tools

The MCP server provides the following tools:

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

## Development

### Setup

```bash
git clone https://github.com/bretterer/forge-mcp-server.git
cd forge-mcp-server
npm install
```

### Build

```bash
npm run build
```

### Run in Development Mode

```bash
npm run dev
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
