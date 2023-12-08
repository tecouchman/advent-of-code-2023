var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\n');

let parseNode = (str) => new Node(...str.replace(' =', '').replace(',', '').replace('(','').replace(')','').split(' '))

let nodes = {}
let startNodes = [];
let directions = "";

class Node {
    constructor(name, leftName, rightName) {
        this.name = name;
        this.leftName = leftName;
        this.rightName = rightName;
        this.isEndNode = name.slice(2,3) == 'Z';
    }

    getLeft() {
        return nodes[this.leftName];
    }

    getRight() {
        return nodes[this.rightName];
    }
}

input.forEach((str) => {
    if (str == '') return;
    if (str.includes('=')) {
        let node = parseNode(str);
        nodes[node.name] = node;
        if (node.name.slice(2,3) == 'A') {
            startNodes.push(node);
        }
    }
    else {
        directions = str;
    }
});

console.log(directions, nodes);

let nodeSteps = []

startNodes.forEach((startNode, index) => {
    
    nodeSteps.push(0);
    let currentNode = startNode;
    
    while (!currentNode.isEndNode) {
        
        switch(directions[nodeSteps[index] % directions.length]) {
            case 'L':
                currentNode = currentNode.getLeft();
                break;
            case 'R':
                currentNode = currentNode.getRight();
                break;
        }

        nodeSteps[index]++;
    }
});


nodeCommonSteps = [...nodeSteps];
console.log(nodeCommonSteps);
while (nodeCommonSteps.some(step => step != nodeCommonSteps[0])) {
    let max = 0
    for (var i = 0; i < nodeCommonSteps.length; i++) {
        if (nodeCommonSteps[i] > max) {
            max = nodeCommonSteps[i];
        }
    }

    for (var i = 0; i < nodeCommonSteps.length; i++) {
        if (nodeCommonSteps[i] < max) {
            nodeCommonSteps[i] += nodeSteps[i]
        }
    }
}

console.log(nodeCommonSteps[0]);
