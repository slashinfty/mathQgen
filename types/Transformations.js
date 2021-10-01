module.exports = class Transformations extends require('../index') {
	constructor(options = {}) {
		super();
		delete this.types;
		const params = Object.assign({
			'coordinates': {
				'min': -15,
				'max': 15
			},
            'vector': {
                'min': -10,
                'max': 10
            },
            'reflection-line': {
                'min': 0,
                'max': 0
            },
            'rotation-center': {
                'min': 0,
                'max': 0
            },
            'dilation-center': {
                'min': 0,
                'max': 0
            },
            'dilation-scale': {
                'min': 2,
                'max': 4
            },
            'dilation-reductions': true,
			'type': 'translation'
		}, options);

        const a = super.randInt(params.coordinates.min, params.coordinates.max);
        const b = super.randInt(params.coordinates.min, params.coordinates.max);
        let c, d, e, f;
        do {
            c = super.randInt(params.coordinates.min, params.coordinates.max);
            d = super.randInt(params.coordinates.min, params.coordinates.max);
        } while (c === a && d === b);
        do {
            e = super.randInt(params.coordinates.min, params.coordinates.max);
            f = super.randInt(params.coordinates.min, params.coordinates.max);
        } while ((e === c && f === d) || (e === a && f === b) || (e === c && e === a) || (f === d && f === b));
        this.question = {
            'point_1': `(${a}, ${b})`,
            'point_2': `(${c}, ${d})`,
            'point_3': `(${e}, ${f})`
        }
        if (params.type === 'translation') {
            const vector = [super.randInt(params.vector.min, params.vector.max), super.randInt(params.vector.min, params.vector.max)];
            this.question['translation'] = {
                'vector': `<${vector[0]}, ${vector[1]}>`
            };
            this.answer = {
                'point_1': `(${a + vector[0]}, ${b + vector[1]})`,
                'point_2': `(${c + vector[0]}, ${d + vector[1]})`,
                'point_3': `(${e + vector[0]}, ${f + vector[1]})`
            };
        } else if (params.type === 'reflection') {
            const line = Math.random() < 0.5 ? 'x' : 'y';
            const lineNo = super.randInt(params['reflection-line'].min, params['reflection-line'].max);
            this.question['reflection'] = {
                'line': `${line}=${lineNo}`
            };
            this.answer = {
                'point_1': line === 'x' ? `(${2 * lineNo - a}, ${b})` : `(${a}, ${2 * lineNo - b})`,
                'point_2': line === 'x' ? `(${2 * lineNo - c}, ${d})` : `(${c}, ${2 * lineNo - d})`,
                'point_3': line === 'x' ? `(${2 * lineNo - e}, ${f})` : `(${e}, ${2 * lineNo - f})`
            };
        } else if (params.type === 'rotation') {
            const degree = Math.random() < 0.5 ? 90 : 180;
            const direction = Math.random() < 0.5 ? 'cw' : 'ccw';
            const center = [super.randInt(params['rotation-center'].min, params['rotation-center'].max), super.randInt(params['rotation-center'].min, params['rotation-center'].max)];
            let pointA, pointB, pointC;
            if (degree === 90 && direction === 'cw') {
                pointA = [center[0] + b - center[1], center[1] - a + center[0]];
                pointB = [center[0] + d - center[1], center[1] - c + center[0]];
                pointC = [center[0] + f - center[1], center[1] - e + center[0]];
            } else if (degree === 90 && direction === 'ccw') {
                pointA = [center[0] - b + center[1], center[1] + a - center[0]];
                pointB = [center[0] - d + center[1], center[1] + c - center[0]];
                pointC = [center[0] - f + center[1], center[1] + e - center[0]];
            } else if (degree === 180) {
                pointA = [2 * center[0] - a, 2 * center[1] - b];
                pointB = [2 * center[0] - c, 2 * center[1] - d];
                pointC = [2 * center[0] - e, 2 * center[1] - f];
            }
            this.question['rotation'] = {
                'degree': degree,
                'direction': direction === 'cw' ? 'clockwise' : 'counterclockwise',
                'center': `(${center[0]}, ${center[1]})`
            };
            this.answer = {
                'point_1': `(${pointA[0]}, ${pointA[1]})`,
                'point_2': `(${pointB[0]}, ${pointB[1]})`,
                'point_3': `(${pointC[0]}, ${pointC[1]})`,
            }
        } else if (params.type === 'dilation') {
            const center = [super.randInt(params['dilation-center'].min, params['dilation-center'].max), super.randInt(params['dilation-center'].min, params['dilation-center'].max)];
            const scale = super.randInt(params['dilation-scale'].min, params['dilation-scale'].max);
            const reduce = params['dilation-reductions'] && Math.random() < 0.5;
            this.question['dilation'] = {
                'scale-factor': reduce ? `1/${scale}` : scale,
                'center': `(${center[0]}, ${center[1]})`
            };
            let pointA, pointB, pointC;
            if (reduce) {
                pointA = [super.simplify(scale * center[0] + a - center[0], scale), super.simplify(scale * center[1] + b - center[1], scale)];
                pointB = [super.simplify(scale * center[0] + c - center[0], scale), super.simplify(scale * center[1] + d - center[1], scale)];
                pointC = [super.simplify(scale * center[0] + e - center[0], scale), super.simplify(scale * center[1] + f - center[1], scale)];
                this.answer = {
                    'point_1': `(${super.isNegative(pointA[0]) ? '-' : ''}${Math.abs(pointA[0][0])}${Math.abs(pointA[0][1]) === 1 ? '' : '/' + Math.abs(pointA[0][1])}, ${super.isNegative(pointA[1]) ? '-' : ''}${Math.abs(pointA[1][0])}${Math.abs(pointA[1][1]) === 1 ? '' : '/' + Math.abs(pointA[1][1])})`,
                    'point_2': `(${super.isNegative(pointB[0]) ? '-' : ''}${Math.abs(pointB[0][0])}${Math.abs(pointB[0][1]) === 1 ? '' : '/' + Math.abs(pointB[0][1])}, ${super.isNegative(pointB[1]) ? '-' : ''}${Math.abs(pointB[1][0])}${Math.abs(pointB[1][1]) === 1 ? '' : '/' + Math.abs(pointB[1][1])})`,
                    'point_3': `(${super.isNegative(pointC[0]) ? '-' : ''}${Math.abs(pointC[0][0])}${Math.abs(pointC[0][1]) === 1 ? '' : '/' + Math.abs(pointC[0][1])}, ${super.isNegative(pointC[1]) ? '-' : ''}${Math.abs(pointC[1][0])}${Math.abs(pointC[1][1]) === 1 ? '' : '/' + Math.abs(pointC[1][1])})`
                };
            } else {
                pointA = [center[0] + (scale * a) - (scale * center[0]), center[1] + (scale * b) - (scale * center[1])];
                pointB = [center[0] + (scale * c) - (scale * center[0]), center[1] + (scale * d) - (scale * center[1])];
                pointC = [center[0] + (scale * e) - (scale * center[0]), center[1] + (scale * f) - (scale * center[1])];
                this.answer = {
                    'point_1': `(${pointA[0]}, ${pointA[1]})`,
                    'point_2': `(${pointB[0]}, ${pointB[1]})`,
                    'point_3': `(${pointC[0]}, ${pointC[1]})`
                };
            }
        }
    }
}