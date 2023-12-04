var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\r\n');

let total = 0;

let currnum = {};
let currNumbers = []
let gears = [];
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

            if (char == '*') {
                gears.push({
                    x: xIndex,
                    y: yIndex
                });
            }
        }

    });
});

console.log(map);
console.log(currNumbers);
console.log(gears);

gears.forEach((curreGear) => {
    let nums = [];
    currNumbers.forEach((currnum) => {
        if (curreGear.x >= currnum.x-1 && curreGear.x <= currnum.x + String(currnum.num).length
            && curreGear.y >= currnum.y-1 && curreGear.y <= currnum.y + 1) {
            nums.push(currnum.num);
        }
    });

    console.log(nums);
    if (nums.length > 1) {
        total += nums.reduce((a, b) => a * b, 1);
    }
});

console.log(total);