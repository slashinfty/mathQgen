const MathQuestionGenerator = require('./index');

const mqg = new MathQuestionGenerator();
/*const first = mqg.ask('FactorQuadratic', {'coefficient': {
				'min': 1,
				'max': 4
			},'gcf':true});

console.log(first);*/

const second = mqg.ask('Transformations', {'type': 'dilation', 'dilation-center': {'min': -5,'max': 5}});

console.log(second);