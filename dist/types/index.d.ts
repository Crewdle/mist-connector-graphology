import { GraphDatabaseConnectorConstructor } from '@crewdle/web-sdk-types';
import { IGraphologyGraphDatabaseOptions } from './models/GraphologyGraphDatabaseOptions';
/**
 * Get the Graphology Graph Database connector.
 * @param options The options.
 * @returns The Graphology Graph Database connector constructor.
 */
export declare function getGraphologyGraphDatabaseConnector(options?: IGraphologyGraphDatabaseOptions): GraphDatabaseConnectorConstructor;
export { GraphDatabaseConnectorConstructor };
