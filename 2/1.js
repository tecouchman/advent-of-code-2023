var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\n');

let colorTotals = { red: 12, green: 13, blue: 14 };
let total = 0;

input.forEach((str) => { 
    let split = str.split(':');
    id = Number(split[0].substring(5));
    let valid = true;
    pulls = split[1].split(';');
    pulls.forEach((pull) => {
        let colors = pull.split(',')
        colors.forEach((c) => {
            let parts = c.trim().split(' ');
            let color = parts[1];
            let amount = Number(parts[0]);

            if (colorTotals[color] < amount) { 
                valid = false;
            }
        });
    });
    if (valid) {
        total += id;
    }
});

console.log(total);