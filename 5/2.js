var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\r\n');

let states = {
    SEEDS: 0,
    SECTION_HEADER: 1,
    MAP_VALUES: 2,
    SECTION_END: 3
}
let currentState = states.SEEDS;
let currentSection = -1;
let map = [];
let seeds = [];
let lowestLocation = Number.MAX_SAFE_INTEGER;

let parseNumbers = (str) => str.split(' ').filter((num) => num != '').map((num) => Number(num));

class Range {
    constructor(start, length) {
        this.start = start;
        this.length = length;
        this.end = start + length - 1;
    }

    contains(num) {
        return num >= this.start && num <= this.end;
    }

    forEach(func) {
        for (let i = this.start; i < this.end; i++) {
            func(i, i - this.start);
        }
    }
}

let parseState = (str) => {
    if (str == '') 
        return states.SECTION_END;
    else if (str.includes('seeds:'))
        return states.SEEDS;
    else if (str.includes('map:'))
        return states.SECTION_HEADER;
    else 
        return states.MAP_VALUES;
}

input.forEach((str, yIndex) => {

    currentState = parseState(str);

    switch (currentState) {
        case states.SEEDS:
            let seedParts = parseNumbers(str.split(':')[1])
            for (let i = 0; i < seedParts.length; i+=2) {
                seeds.push(new Range(seedParts[i], seedParts[i+1]));
            }
            break;
        case states.SECTION_HEADER:
            currentSection++;
            map.push([]);
            break;
        case states.MAP_VALUES:
            let values = parseNumbers(str)
            map[currentSection].push({
                source: new Range(values[1], values[2]),
                destination: new Range(values[0], values[2])
            });
            break;
        case states.SECTION_END:
            break;
    }
});

seeds.forEach((range) => {
    range.forEach((seed) => {
        let source = seed;
        map.forEach((mapping) => {
            for (let i = 0; i < mapping.length; i++) {
                let section = mapping[i];
                if (section.source.contains(source)) {
                    source = section.destination.start + (source - section.source.start);
                    break;
                }
            };
        });

        if (source < lowestLocation) {
            lowestLocation = source;
        }
    });
});

console.log(lowestLocation);