import { GraphologyGraphDatabaseConnector } from './models/GraphologyGraphDatabaseConnector';
/**
 * Get the Graphology Graph Database connector.
 * @param options The options.
 * @returns The Graphology Graph Database connector constructor.
 */
export function getGraphologyGraphDatabaseConnector(options) {
    if (!options) {
        return GraphologyGraphDatabaseConnector;
    }
    return class GraphologyGraphDatabaseConnectorWithInjectedOptions extends GraphologyGraphDatabaseConnector {
        constructor(dbKey) {
            super(dbKey, options);
        }
    };
}
