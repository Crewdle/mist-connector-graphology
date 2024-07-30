import { IGraphDatabaseConnector } from '@crewdle/web-sdk-types';
import Graph from 'graphology';
export declare class GraphologyGraphDatabaseConnector implements IGraphDatabaseConnector {
    graph: Graph;
    constructor();
    addNode(node: string): void;
    addEdge(from: string, to: string): void;
    getNeighbors(node: string): string[];
}
