var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\r\n');

let total = 1;

let parseNumbers = (str) => str.split(' ').filter((num) => num != '').map((num) => Number(num));

let parsedNumbers = [];
input.forEach((str) => {
    parsedNumbers.push(parseNumbers(str.split(':')[1]));
});

for (let i = 0; i < parsedNumbers[0].length; i++) {
    raceLength = parsedNumbers[0][i];
    winningDistance = parsedNumbers[1][i];
    let raceWinningChances= 0;
    
    for (let hold = 0; hold < raceLength; hold++) {
        let distance = (raceLength - hold) * hold;

        if (distance > winningDistance) {
            raceWinningChances++;
        }
    }
    total *= raceWinningChances;
}


console.log(total);