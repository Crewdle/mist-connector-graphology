import Graph from 'graphology';
export class GraphologyGraphDatabaseConnector {
    graph;
    constructor() {
        this.graph = new Graph();
    }
    addNode(name, content, node) {
        const attributes = {};
        attributes[name] = content;
        this.graph.mergeNode(node, attributes);
    }
    addEdge(from, to) {
        this.graph.mergeEdge(from, to);
    }
    getNeighbors(node) {
        return this.graph.neighbors(node);
    }
    getSize() {
        return JSON.stringify(this.graph.export()).length;
    }
}
