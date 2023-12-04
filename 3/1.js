var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\r\n');

let total = 0;

let currnum = {};
let currNumbers = []
let inNumber = false;
let map = [,];

input.forEach((str, yIndex) => { 

    map[yIndex] = [];
    str.replace('\r','').split('').forEach((char, xIndex) => {
        map[yIndex].push(char);
        let num = Number(char);
        
        if (!Number.isNaN(num)) {
            // PART NUMBER!
            if (inNumber) {
                currnum.num = currnum.num * 10 + num;
            }
            else {
                inNumber = true;
                currnum = {
                    num: num,
                    x: xIndex,
                    y: yIndex
                }
                currNumbers.push(currnum);
            }
        }
        else {
            inNumber = false;
        }

    });
});

currNumbers.forEach((currnum) => {

    for (let y = currnum.y-1; y <= currnum.y+1; y++) {
        for (let x = currnum.x-1; x <= currnum.x + String(currnum.num).length; x++) {
            // console.log
            if (x >= 0 && y >= 0 && x < map[0].length && y < map.length) {
                let num = map[y][x];
                if (map[y][x] != '.' && Number.isNaN(Number(num))) {
                    total += currnum.num;
                    console.log(map[y][x] + ' adding ' + currnum.num)
                    return;
                }
            }
        }
    }

});

console.log(map);
console.log(currNumbers);
console.log(total);