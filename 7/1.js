var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\n');

cards = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, T: 10, J: 11, Q: 12, K: 13, A: 14 };

hands = [];

class Hand {
    constructor(hand, bid) {
        this.cards = hand.split('').map((card) => cards[card]);
        this.bid = Number(bid);
        this.counts = {};
        this.cards.forEach((value) => {
            this.counts[value] = this.counts[value] ? this.counts[value] + 1 : 1;
        });
        this.calculateType()
    }

    calculateType() {
        if (this.isFiveOfAKind())
            this.type = 7;
        else if (this.isFourOfAKind())
            this.type = 6;
        else if (this.isFullHouse())
            this.type = 5;
        else if (this.isThreeOfAKind())
            this.type = 4;
        else if (this.isTwoPair())
            this.type = 3;
        else if (this.isOnePair())
            this.type = 2;
        else
            this.type = 1;
    }

    compare(hand) {
        let typeDiff = this.type - hand.type;

        if (typeDiff != 0) {
            return typeDiff;
        }
        else {
            for (let i = 0; i < this.cards.length; i++) {
                let CardDiff = this.cards[i] - hand.cards[i];
                if (CardDiff != 0) {
                    return CardDiff;
                }
            }
        }
    }

    isFiveOfAKind() {
        return Object.values(this.counts).some(value => value == 5);
    }

    isFourOfAKind() {
        return Object.values(this.counts).some(value => value == 4);
    }

    isFullHouse() {
        return Object.values(this.counts).some(value => value == 3) && Object.values(this.counts).some(value => value == 2);
    }

    isThreeOfAKind() {
        return Object.values(this.counts).some(value => value == 3) && Object.values(this.counts).some(value => value != 2);
    }

    isTwoPair() {
        return Object.values(this.counts).filter((count) => count == 2).length == 2;
    }

    isOnePair() {
        return Object.values(this.counts).filter((count) => count == 2).length == 1;
    }
}

input.forEach((str) => {
    if (str == '') return;
    
    hands.push(new Hand(...str.split(' ')));
});

hands.sort((a, b) => a.compare(b));

let total = hands.reduce((acc, curr, index) =>
    acc += curr.bid * (index + 1), 0);

console.log(total);
