const MathQuestionGenerator = require('./index');

const mqg = new MathQuestionGenerator();
const first = mqg.ask('Test', { x: 1 });

console.log(first);