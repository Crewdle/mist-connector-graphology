import Graph from 'graphology';
import { IGraphDatabaseConnector, IIndex } from '@crewdle/web-sdk-types';
import { IGraphologyGraphDatabaseOptions } from './GraphologyGraphDatabaseOptions';
export declare class GraphologyGraphDatabaseConnector implements IGraphDatabaseConnector {
    private readonly dbKey;
    private readonly options?;
    graph: Graph;
    documents: {
        [key: string]: string;
    };
    private baseFolder?;
    constructor(dbKey: string, options?: IGraphologyGraphDatabaseOptions | undefined);
    addNode(name: string, content: string, index: IIndex[], node: string): void;
    addEdge(from: string, to: string): void;
    getContent(nodes: string[], maxDepth?: number, contentSize?: number): {
        [key: string]: string[];
    };
    getSize(): number;
    remove(name: string): void;
    saveToDisk(version: number): void;
    loadFromDisk(version: number): void;
    private getNeighbors;
}
