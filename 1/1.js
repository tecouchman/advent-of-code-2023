var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\n');

let total = input.reduce((total, str) => { 
    let first, last = 0;
    str.split('').forEach((char) => { 
        if (!Number.isNaN(Number(char))) { 
            first = first || char;
            last = char; 
        }
    });
    return total + Number(first+last);
}, 0);
console.log(total);