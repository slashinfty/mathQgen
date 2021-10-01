module.exports = class FactorQuadratic extends require('../index') {
    constructor(options = {}) {
        super();
        delete this.types;
        const params = Object.assign({
            'coefficient': {
                'min': 1,
                'max': 1
            },
            'constant': {
                'min': -15,
                'max': 15
            },
            'gcf': false
        }, options);

        let p, q, r, s;
        do {
            p = super.randInt(params.coefficient.min, params.coefficient.max);
        } while (p === 0);
        do {
            r = super.randInt(params.coefficient.min, params.coefficient.max);
        } while (r === 0);
        do {
            q = super.randInt(params.constant.min, params.constant.max);
        } while (q === 0 || (params.gcf ? false : super.gcd(p, q) > 1));
        do {
            s = super.randInt(params.constant.min, params.constant.max);
        } while (s === 0 || (params.gcf ? false : super.gcd(r, s) > 1));
        const a = p * r;
        const b = (p * s) + (q * r);
        const c = q * s;
        const simpPQ = super.simplify(p, q, true);
        const simpRS = super.simplify(r, s, true);
        const g = simpPQ[2] * simpRS[2];

        this.question = `${a === 1 ? '' : a}x^2${b === 0 ? '' : super.isNegative(b) ? '-' + Math.abs(b) + 'x' : '+' + b + 'x'}${super.isNegative(c) ? '-' + Math.abs(c) : '+' + c}`;

        this.answer = {
            'factored': `${g === 1 ? '' : g}(${simpPQ[0] === 1 ? '' : simpPQ[0]}x${super.isNegative(simpPQ[1]) ? '-' + Math.abs(simpPQ[1]) : '+' + simpPQ[1]})(${simpRS[0] === 1 ? '' : simpRS[0]}x${super.isNegative(simpRS[1]) ? '-' + Math.abs(simpRS[1]) : '+' + simpRS[1]})`,
            'zero_1': `${super.isNegative([simpPQ[1], simpPQ[0]]) ? '' : '-'}${Math.abs(simpPQ[0]) === 1 ? Math.abs(simpPQ[1]) : Math.abs(simpPQ[1]) + '/' + Math.abs(simpPQ[0])}`,
            'zero_2': `${super.isNegative([simpRS[1], simpRS[0]]) ? '' : '-'}${Math.abs(simpRS[0]) === 1 ? Math.abs(simpRS[1]) : Math.abs(simpRS[1]) + '/' + Math.abs(simpRS[0])}`
        }
    }
}
