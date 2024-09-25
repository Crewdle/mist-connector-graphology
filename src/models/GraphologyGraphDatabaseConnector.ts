import { IGraphDatabaseConnector, IIndex } from '@crewdle/web-sdk-types';
import Graph from 'graphology';

interface IGraphologyGraphDatabaseIndex {
  startIndex: number;
  length: number;
}

export class GraphologyGraphDatabaseConnector implements IGraphDatabaseConnector {
  graph: Graph;
  documents: { [key: string]: string } = {};

  constructor() {
    this.graph = new Graph();
  }

  addNode(name: string, content: string, index: IIndex[], node: string): void {
    this.documents[name] = content;
    const attributes: { [key: string]: IGraphologyGraphDatabaseIndex[] } = {};
    attributes[name] = index.map((i) => ({ startIndex: i.start, length: i.length }));
    this.graph.mergeNode(node, attributes);
  }

  addEdge(from: string, to: string): void {
    this.graph.mergeEdge(from, to);
  }

  getContent(nodes: string[], maxDepth: number = 1, contentSize: number = 0): { [key: string]: string[]; } {
    const content: { [key: string]: string[] } = {};

    const entities: Set<string> = new Set();
    for (const node of nodes) {
      try {
        const neighbors = this.getNeighbors(node, maxDepth);
        for (const neighbor of neighbors) {
          entities.add(neighbor);
        }
        entities.add(node);
      } catch (e) {}
    }

    for (const entity of entities) {
      const newContent = this.graph.getNodeAttributes(entity) as { [key: string]: IGraphologyGraphDatabaseIndex[] };
      for (const key in newContent) {
        if (this.documents[key] === undefined) {
          continue;
        }
        if (content[key] === undefined) {
          content[key] = [];
        }
        content[key].push(...newContent[key].map((index) => {
          const startIndex = Math.max(0, index.startIndex - contentSize);
          const endIndex = Math.min(this.documents[key].length, index.startIndex + index.length + contentSize);
          return this.documents[key].substring(startIndex, endIndex);
        }));
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

  remove(name: string): void {
    delete this.documents[name];
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
