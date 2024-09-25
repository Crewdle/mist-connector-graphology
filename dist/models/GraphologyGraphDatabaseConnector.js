import Graph from 'graphology';
export class GraphologyGraphDatabaseConnector {
    graph;
    documents = {};
    constructor() {
        this.graph = new Graph();
    }
    addNode(name, content, index, node) {
        this.documents[name] = content;
        const attributes = {};
        attributes[name] = index.map((i) => ({ startIndex: i.start, length: i.length }));
        this.graph.mergeNode(node, attributes);
    }
    addEdge(from, to) {
        this.graph.mergeEdge(from, to);
    }
    getContent(nodes, maxDepth = 1, contentSize = 0) {
        const content = {};
        const entities = new Set();
        for (const node of nodes) {
            try {
                const neighbors = this.getNeighbors(node, maxDepth);
                for (const neighbor of neighbors) {
                    entities.add(neighbor);
                }
                entities.add(node);
            }
            catch (e) { }
        }
        for (const entity of entities) {
            const newContent = this.graph.getNodeAttributes(entity);
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
    getSize() {
        return JSON.stringify(this.graph.export()).length;
    }
    remove(name) {
        delete this.documents[name];
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
