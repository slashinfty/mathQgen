# mathQgen
Node.js framework to generate math questions

## Usage
```js
const MathQuestionGenerator = require('mathQgen');
const mqg = new MathQuestionGenerator();
```

To get a question, use `mqg.ask('type', 'params')`.

All possible types can be found in the `types/` folder.
