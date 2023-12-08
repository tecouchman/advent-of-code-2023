var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\n');

let parseNode = (str) => new Node(...str.replace(' =', '').replace(',', '').replace('(','').replace(')','').split(' '))

let nodes = {}
let directions = "";
let steps = 0;

class Node {
    constructor(name, leftName, rightName) {
        this.name = name;
        this.leftName = leftName;
        this.rightName = rightName;
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
    }
    else {
        directions = str;
    }
});

console.log(directions, nodes);

let currentNode = nodes['AAA'];
console.log(currentNode);
while (currentNode.name != 'ZZZ') {
    
    switch(directions[steps % directions.length]) {
        case 'L':
            currentNode = currentNode.getLeft();
            break;
        case 'R':
            currentNode = currentNode.getRight();
            break;
    }
    steps++;
    console.log(currentNode);
}


console.log(steps);
