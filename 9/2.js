var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\n');

let total = 0;
let parseNumbers = (str) => str.split(' ').filter((num) => num != '').map((num) => Number(num));
let lines = input.filter(str => str != '').map(str => [ parseNumbers(str) ]);

lines.forEach(line => {
    let n = 0;

    while (line[n].some((num, index) => num != 0)) {
        let next = [];
        for (let i = 1; i < line[n].length; i++) {
            next.push(line[n][i] - line[n][i-1]);
        }
        line.push(next);
        n++;
    }

    let newVal = 0;
    for (let i = line.length - 1; i > 0; i--) {
        newVal = line[i-1][0]-newVal;
    }
    total += newVal;
});

console.log(total);
