class Test extends require('../index') {
    constructor(params = {'x': 3}) {
        super();
        this.x = params.x;
    }
}

module.exports = Test;