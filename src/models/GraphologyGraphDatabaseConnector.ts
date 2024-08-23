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

  getContent(nodes: string[], maxDepth: number): { [key: string]: string[]; } {
    const content: { [key: string]: string[] } = {};

    const entities = new Set(nodes);
    for (const node of nodes) {
      const neighbors = this.getNeighbors(node, maxDepth);
      for (const neighbor of neighbors) {
        entities.add(neighbor);
      }
    }

    for (const entity of entities) {
      const newContent = this.graph.getNodeAttributes(entity);
      for (const key in newContent) {
        if (content[key] === undefined) {
          content[key] = [];
        }
        content[key].push(...newContent[key]);
      }
    }

    for (const key in content) {
      content[key] = [...new Set(content[key])];
    }

    return content;
  }

  getSize(): number {
    return JSON.stringify(this.graph.export()).length;
  }

  private getNeighbors(node: string, depth: number): string[] {
    if (depth === 0) {
      return [node];
    }
    const neighbors = this.graph.neighbors(node);
    const result: string[] = [node];
    for (const neighbor of neighbors) {
      result.push(...this.getNeighbors(neighbor, depth - 1));
    }
    return result;
  }
}
