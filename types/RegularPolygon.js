module.exports = class RegularPolygon extends require('../index') {
    constructor(options = {}) {
        super();
        delete this.types;
        const params = Object.assign({
            'given-length': {
                'min': 1,
                'max': 15
            },
            'side-count': {
                'min': 3,
                'max': 12
            },
            'rounding': 3,
            'given': 'side'
        }, options);

        const numberSides = super.randInt(params['side-count'].min, params['side-count'].max);
        if (params.given === 'side') {
            const side = super.randFloat(params['given-length'].min, params['given-length'].max, params.rounding);
            this.question = {
                'side': side,
                'number-of-sides': numberSides
            };
            const apothem = side / (2 * Math.tan(Math.PI / numberSides));
            const radius = side / (2 * Math.sin(Math.PI / numberSides));
            const area = (Math.pow(side, 2) * numberSides) / (4 * Math.tan(Math.PI / numberSides));
            this.answer = {
                'apothem': apothem,
                'radius': radius,
                'area': area
            };
        } else if (params.given === 'radius') {
            const radius = super.randFloat(params['given-length'].min, params['given-length'].max, params.rounding);
            this.question = {
                'radius': radius,
                'number-of-sides': numberSides
            };
            const apothem = radius * Math.cos(Math.PI / numberSides);
            const side = 2 * radius * Math.sin(Math.PI / numberSides);
            const area = (Math.pow(radius, 2) * numberSides * Math.sin((2 * Math.PI)/ numberSides)) / 2;
            this.answer = {
                'apothem': apothem,
                'side': side,
                'area': area
            };
        } else if (params.given === 'apothem') {
            const apothem = super.randFloat(params['given-length'].min, params['given-length'].max, params.rounding);
            this.question = {
                'apothem': apothem,
                'number-of-sides': numberSides
            };
            const side = 2 * apothem * Math.tan(Math.PI / numberSides);
            const radius = apothem / Math.cos(Math.PI / numberSides);
            const area = Math.pow(apothem, 2) * numberSides * Math.tan(Math.PI / numberSides);
            this.answer = {
                'side': side,
                'radius': radius,
                'area': area
            };
        }
    }
}