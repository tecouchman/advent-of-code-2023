var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\n');

let total = 0;

input.forEach((str) => { 
    let split = str.split(':');
    id = Number(split[0].substring(5));
    let minColors = { red: 0, green: 0, blue: 0 };
    pulls = split[1].split(';');
    pulls.forEach((pull) => {
        let colors = pull.split(',')
        colors.forEach((c) => {
            let parts = c.trim().split(' ');
            let color = parts[1];
            let amount = Number(parts[0]);

            if (minColors[color] < amount) { 
                minColors[color] = amount;
            }
        });
    });
    total += minColors.red * minColors.green * minColors.blue;
});

console.log(total);