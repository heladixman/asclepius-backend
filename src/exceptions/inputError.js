const ClientError = require("./clientError");

class InputError extends ClientError {
    constructor() {
        super(message, statusCode)
        this.name = 'InputError'
    }
}
module.exports = new InputError();