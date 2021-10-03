const MathQuestionGenerator = require('./index');

const mqg = new MathQuestionGenerator();
const test = mqg.ask('FactorQuadratic', {'coefficient': {
				'min': 1,
				'max': 4
			},'gcf':false});


//const test = mqg.ask('Transformations', {'type': 'dilation', 'dilation-center': {'min': -5,'max': 5}});

//const test = mqg.ask('RegularPolygon', {'given': 'apothem'});

console.log(test);