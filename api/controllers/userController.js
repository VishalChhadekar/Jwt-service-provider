var jwt = require('jsonwebtoken');
// var config = require('../config/config');

exports.getUser = (req, res) => {
    res.send('respond with a resource');
};

exports.createUser = (req, res) => {
    console.log("INCOMING.......");
    var { identity, clientId, clientSecret, isAnonymous, aud } = req.body;
    aud = aud || "https://idproxy.kore.com/authorize";

    var options = {
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000,
        aud,
        iss: clientId,
        sub: identity,
        isAnonymous: isAnonymous || false,
    };

    var token = jwt.sign(options, clientSecret);
    console.log("Token: ", token);

    res.header('Access-Control-Allow-Origin', '*');
    res.send({ jwt: token });
};
