var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\r\n');

let total = 0;

let parsedNumbers = [];
input.forEach((str) => {
    parsedNumbers.push(Number(str.split(':')[1].split(' ').join('')));
});

let raceLength = parsedNumbers[0];
let winningDistance = parsedNumbers[1];

for (let hold = 0; hold < raceLength; hold++) {
    let distance = (raceLength - hold) * hold;

    if (distance > winningDistance) {
        total++;
    }
}

console.log(total);