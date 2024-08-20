import { IGraphDatabaseConnector } from '@crewdle/web-sdk-types';
import Graph from 'graphology';

export class GraphologyGraphDatabaseConnector implements IGraphDatabaseConnector {
  graph: Graph;

  constructor() {
    this.graph = new Graph();
  }

  addNode(name: string, content: string[], node: string): void {
    const attributes: { [key: string]: string[] } = {};
    attributes[name] = content;
    this.graph.mergeNode(node, attributes);
  }

  addEdge(from: string, to: string): void {
    this.graph.mergeEdge(from, to);
  }

  getNeighbors(node: string): string[] {
    return this.graph.neighbors(node);
  }

  getSize(): number {
    return JSON.stringify(this.graph.export()).length;
  }
}
