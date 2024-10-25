import { GraphDatabaseConnectorConstructor } from '@crewdle/web-sdk-types';

import { GraphologyGraphDatabaseConnector } from './models/GraphologyGraphDatabaseConnector';
import { IGraphologyGraphDatabaseOptions } from './models/GraphologyGraphDatabaseOptions';

/**
 * Get the Graphology Graph Database connector.
 * @param options The options.
 * @returns The Graphology Graph Database connector constructor.
 */
export function getGraphologyGraphDatabaseConnector(
  options?: IGraphologyGraphDatabaseOptions
): GraphDatabaseConnectorConstructor {
  if (!options) {
    return GraphologyGraphDatabaseConnector;
  }

  return class GraphologyGraphDatabaseConnectorWithInjectedOptions extends GraphologyGraphDatabaseConnector {
    constructor(dbKey: string) {
      super(dbKey, options);
    }
  };
}

export { GraphDatabaseConnectorConstructor };
