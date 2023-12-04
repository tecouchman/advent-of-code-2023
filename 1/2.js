var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\n');

let strNums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
for (let i = 1; i < 10; i++) strNums.push(i + '');

let total = input.reduce((total, str) => { 
    let first, last = 0, firstIndex = Number.MAX_VALUE, lastIndex = -1;
    strNums.forEach((num, numIndex) => {
        idx = str.indexOf(num);
        if (idx > -1) {
            lIdx = str.lastIndexOf(num);
            if (idx < firstIndex) {
                first = (numIndex % 9) + 1;
                firstIndex = idx;
            }
            if (lIdx > lastIndex) {
                last = (numIndex % 9) + 1;
                lastIndex = lIdx;
            }
        }
    });
    return total + first * 10 + last;
}, 0);
console.log(total);
