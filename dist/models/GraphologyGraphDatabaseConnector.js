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
    getContent(nodes, maxDepth) {
        const content = {};
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
    getSize() {
        return JSON.stringify(this.graph.export()).length;
    }
    getNeighbors(node, depth) {
        if (depth === 0) {
            return [node];
        }
        const neighbors = this.graph.neighbors(node);
        const result = [node];
        for (const neighbor of neighbors) {
            result.push(...this.getNeighbors(neighbor, depth - 1));
        }
        return result;
    }
}
