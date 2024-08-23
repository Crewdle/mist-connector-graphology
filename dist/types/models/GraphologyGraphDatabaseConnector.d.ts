import { IGraphDatabaseConnector } from '@crewdle/web-sdk-types';
import Graph from 'graphology';
export declare class GraphologyGraphDatabaseConnector implements IGraphDatabaseConnector {
    graph: Graph;
    constructor();
    addNode(name: string, content: string[], node: string): void;
    addEdge(from: string, to: string): void;
    getContent(nodes: string[], maxDepth: number): {
        [key: string]: string[];
    };
    getSize(): number;
    private getNeighbors;
}
