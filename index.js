const fs = require('fs');
const path = require('path');

module.exports = class MathQuestionGenerator {
    constructor() {
        this.types = new Map(fs.readdirSync(path.join(__dirname, '/types')).filter(file => file.endsWith('.js')).map(file => [file.replace('.js', ''), require(`./types/${file}`)]));
    }

    ask(type, params) {
        const fn = this.types.get(type);
        return new fn(params);
    }
    
    gcd(x, y) {
        let g = (a, b) => a === 1 && b === -1 ? 1 : b ? g(Math.abs(b), a % b) : a;
        let result = g(x, y);
        return result < 0 && Math.sign(x) === Math.sign(y) ? Math.abs(result) : result;
	}

    simplify(num, den, lcm = false) {
        let gcd = this.gcd(num, den);
        return lcm ? [num / gcd, den / gcd, gcd] : [num / gcd, den / gcd];
    }

    isNegative(obj) {
        return typeof obj === 'object' ? (obj[0] < 0 && obj[1] > 0) || (obj[0] > 0 && obj[1] < 0) : obj < 0;
    }

    randInt(min, max) {
        return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
    }

    randFloat(min, max, places) {
        return Math.round((Math.random() * (max - min) + min) * Math.pow(10, places)) / Math.pow(10, places);
    }
}