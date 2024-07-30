# Crewdle Mist Graphology Graph Database Connector

## Introduction

The Crewdle Mist Graphology Graph Database Connector is a solution designed for seamless and efficient modeling and querying of relational data using graph databases. This connector enables the Crewdle SDK to leverage the capabilities of the Graphology graph database, providing robust and high-performance graph modeling and query functionality. With its easy integration and reliable data handling, it's an ideal choice for developers looking to implement scalable and effective relationship modeling and querying solutions within their ecosystem, perfectly complementing the Generative AI Worker Connector for advanced AI-driven applications.

## Getting Started

Before diving in, ensure you have installed the [Crewdle Mist SDK](https://www.npmjs.com/package/@crewdle/web-sdk).

## Installation

```bash
npm install @crewdle/mist-connector-graphology
```

## Usage

```TypeScript
import { GraphologyGraphDatabaseConnector } from '@crewdle/mist-connector-graphology';

const sdk = await SDK.getInstance(config.vendorId, config.accessToken, {
  graphDatabaseConnector: GraphologyGraphDatabaseConnector,
}, config.secretKey);
```

## Need Help?

Reach out to support@crewdle.com or raise an issue in our repository for any assistance.

## Join Our Community

For an engaging discussion about your specific use cases or to connect with fellow developers, we invite you to join our Discord community. Follow this link to become a part of our vibrant group: [Join us on Discord](https://discord.gg/XJ3scBYX).
