const MathQuestionGenerator = require('./index');

const mqg = new MathQuestionGenerator();
const first = mqg.ask('DistanceMidpoint');

console.log(first);