import fs from 'fs';
import path from 'path';
import Graph from 'graphology';
export class GraphologyGraphDatabaseConnector {
    dbKey;
    options;
    graph;
    documents = {};
    baseFolder;
    constructor(dbKey, options) {
        this.dbKey = dbKey;
        this.options = options;
        this.baseFolder = this.options?.baseFolder;
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
    saveToDisk(version) {
        if (!this.baseFolder) {
            return;
        }
        const graphBuffer = Buffer.from(JSON.stringify(this.graph.export()));
        const graphBufferLength = graphBuffer.byteLength;
        const documentsBuffer = Buffer.from(JSON.stringify(this.documents));
        const documentsBufferLength = documentsBuffer.byteLength;
        let buffer = Buffer.alloc(4 + 4);
        buffer.writeUInt32LE(graphBufferLength, 0);
        buffer.writeUInt32LE(documentsBufferLength, 4);
        buffer = Buffer.concat([buffer, graphBuffer, documentsBuffer]);
        try {
            const pattern = new RegExp(`^graph-${this.dbKey}-.*\.bin$`);
            const files = fs.readdirSync(this.baseFolder);
            for (const file of files) {
                if (pattern.test(file)) {
                    fs.rmSync(path.join(this.baseFolder, file), { force: true });
                }
            }
        }
        catch (err) {
            console.error('Error removing files:', err);
        }
        fs.writeFileSync(`${this.baseFolder}/graph-${this.dbKey}-${version}.bin`, buffer);
    }
    loadFromDisk(version) {
        if (!this.baseFolder) {
            return;
        }
        const buffer = fs.readFileSync(`${this.baseFolder}/graph-${this.dbKey}-${version}.bin`);
        const graphBufferLength = buffer.readUInt32LE(0);
        const documentsBufferLength = buffer.readUInt32LE(4);
        const graphBuffer = buffer.subarray(4 + 4, 4 + 4 + graphBufferLength);
        const documentsBuffer = buffer.subarray(4 + 4 + graphBufferLength, 4 + 4 + graphBufferLength + documentsBufferLength);
        this.graph.import(JSON.parse(graphBuffer.toString()));
        this.documents = JSON.parse(documentsBuffer.toString());
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
