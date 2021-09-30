module.exports = class DistanceMidpoint extends require('../index') {
    constructor(params = {
        'min': -20,
        'max': 20
    }) {
        super();
        delete this.types;

        const a = super.randInt(params.min, params.max);
        const b = super.randInt(params.min, params.max);
        let c, d;
        do {
            c = super.randInt(params.min, params.max);
            d = super.randInt(params.min, params.max);
        } while (c === a && d === b);
        const xMid = super.reduce(a + c, 2);
        const yMid = super.reduce(b + d, 2);
        const radicand = Math.pow(d - b, 2) + Math.pow(c - a, 2);
        const approx = Math.sqrt(radicand);

        this.question = {
            'point_1': `(${a}, ${b})`,
            'point_2': `(${c}, ${d})`
        };

        this.answer = {
            'midpoint': `(${super.negative(xMid) ? '-' : ''}${Math.abs(xMid[0])}${Math.abs(xMid[1]) !== 1 ? '/' + Math.abs(xMid[1]) : ''}, ${super.negative(yMid) ? '-' : ''}${Math.abs(yMid[0])}${Math.abs(yMid[1]) !== 1 ? '/' + Math.abs(yMid[1]) : ''})`,
            'distance': {
                'exact': Number.isInteger(approx) ? approx : `sqrt(${radicand})`,
                'approx': approx
            }
        };
    }
}