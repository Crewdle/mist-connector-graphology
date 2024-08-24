import { IGraphDatabaseConnector, IIndex } from '@crewdle/web-sdk-types';
import Graph from 'graphology';
export declare class GraphologyGraphDatabaseConnector implements IGraphDatabaseConnector {
    graph: Graph;
    documents: {
        [key: string]: string;
    };
    constructor();
    addNode(name: string, content: string, index: IIndex[], node: string): void;
    addEdge(from: string, to: string): void;
    getContent(nodes: string[], maxDepth?: number, contentSize?: number): {
        [key: string]: string[];
    };
    getSize(): number;
    private getNeighbors;
}
