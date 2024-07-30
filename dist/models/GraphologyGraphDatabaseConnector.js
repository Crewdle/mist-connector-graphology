import Graph from 'graphology';
export class GraphologyGraphDatabaseConnector {
    graph;
    constructor() {
        this.graph = new Graph();
    }
    addNode(node) {
        this.graph.addNode(node);
    }
    addEdge(from, to) {
        this.graph.addEdge(from, to);
    }
    getNeighbors(node) {
        return this.graph.neighbors(node);
    }
}
