var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\r\n');

let total = 0;

let parseNumbers = (str) => str.split(' ').filter((num) => num != '').map((num) => Number(num));

input.forEach((str, yIndex) => { 
    [ winning, mine ] = str.split(':')[1].split('|')
    let winningNumbers = parseNumbers(winning)

    total += parseNumbers(mine)
    .filter((num) => winningNumbers.includes(num))
    .reduce((acc, curr) => acc > 0 ? acc * 2 : 1, 0)
});

console.log(total);