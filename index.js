const fs = require('fs');
const path = require('path');

class MathQuestionGenerator {
    constructor() {
        this.types = new Map(fs.readdirSync(path.join(__dirname, '/types')).filter(file => file.endsWith('.js')).map(file => [file.replace('.js', ''), require(`./types/${file}`)]));
    }

    ask(type, params) {
        const fn = this.types.get(type);
        return new fn(params);
    }

    reduce(num, den, lcm = false) {
        let gcd = (a, b) => b ? gcd(b, a % b) : a;
        gcd = gcd(num, den);
        return lcm ? [num / gcd, den / gcd, gcd] : [num / gcd, den / gcd];
    }

    negative(frac) {
        return (frac[0] < 0 && frac[1] > 0) || (frac[0] > 0 && frac[1] < 0);
    }

    randInt(min, max) {
        return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
    }
}

module.exports = MathQuestionGenerator;