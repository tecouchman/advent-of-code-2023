const { count } = require('console');
var fs = require('fs');
var path = require('path');
let input = fs.readFileSync(path.join(__dirname, `../input/${path.basename(__dirname)}/input.txt`), 'utf8').split('\n');

cards = { J: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, T: 10, Q: 12, K: 13, A: 14 };

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
        return Object.entries(this.counts).some(count => count[1] == 5 || (count[0] != cards.J && count[1] >= (5 - this.counts[cards.J])));
    }

    isFourOfAKind() {
        return Object.entries(this.counts).some(count => {
            return count[1] == 4 || (count[0] != cards.J && count[1] >= (4 - this.counts[cards.J]))
        });
    }

    isFullHouse() {
        let threeOfAKind = this.getThreeOfAKind();
        let twosOfAKind = this.getTwosOfAKind();

        if (threeOfAKind != undefined) {
            if (twosOfAKind.length > 0) {
                return true;
            }
            else if (threeOfAKind.type != cards.J && this.counts[cards.J] > 0) {
                return true;
            }
        }
        else if (twosOfAKind.length > 1 && this.counts[cards.J] > 0) {
            return true;
        }
        else return false;
    }

    isThreeOfAKind() {
        let threeOfAKindType = this.getThreeOfAKind();

        if (threeOfAKindType != undefined) {
            return true;
        }
        else {
            let twosOfAKind = this.getTwosOfAKind();
            if (this.counts[cards.J] > 1)
                return true;
            if (twosOfAKind.some((count) => count[0] != cards.J) && this.counts[cards.J] > 0) {
                return true;
            }

            return false;
        }
    }

    getThreeOfAKind() {
        return Object.entries(this.counts).find(count => count[1] == 3);
    }

    getTwosOfAKind() {
        return Object.entries(this.counts).filter(count => count[1] == 2);
    }

    isTwoPair() {
        let twosOfAKind = this.getTwosOfAKind();
        if (twosOfAKind.length > 1) {
            return true;
        }
        else if (twosOfAKind.length == 1 && twosOfAKind[0].type != cards.J && this.counts[cards.J] > 0) {
            return true;
        }

        return false;
    }

    isOnePair() {
        return Object.values(this.counts).filter((count) => count == 2).length == 1 || this.counts[cards.J] > 0;
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
