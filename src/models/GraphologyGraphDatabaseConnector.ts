import { IGraphDatabaseConnector } from '@crewdle/web-sdk-types';
import Graph from 'graphology';

export class GraphologyGraphDatabaseConnector implements IGraphDatabaseConnector {
  graph: Graph;

  constructor() {
    this.graph = new Graph();
  }

  addNode(node: string): void {
    this.graph.addNode(node);
  }
  addEdge(from: string, to: string): void {
    this.graph.addEdge(from, to);
  }
  getNeighbors(node: string): string[] {
    return this.graph.neighbors(node);
  }
}
