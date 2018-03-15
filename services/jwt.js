const jwt = require('jwt-simple');
const config = require('../config');
const moment = require('moment');
moment.locale('es')
exports.createToken = function(email) {
    let payload = {
        email: email,
        iat: moment().format("DD/MM/YYYY"),
        exp: moment().add(3, 'days').calendar()
    }

    return jwt.encode(payload, config.secret)
}