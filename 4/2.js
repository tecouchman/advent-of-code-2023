var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\r\n');

let total = 0;
let cards = []

let parseNumbers = (str) => str.split(' ').filter((num) => num != '').map((num) => Number(num));

input.forEach((str, yIndex) => { 
    [ winning, mine ] = str.split(':')[1].split('|')
    cards.push({ winning: parseNumbers(winning), mine: parseNumbers(mine), count: 1 });
});

cards.forEach((card, index) => {
    let wins = card.mine.filter((num) => card.winning.includes(num)).length;

    for (let i = 0; i < card.count; i++) {
        for (let dupIndex = index + 1; dupIndex < index + 1 + wins; dupIndex++) {
            cards[dupIndex].count++;
        }
    }
});

total = cards.reduce((acc, curr) => acc + curr.count, 0);

console.log(total);