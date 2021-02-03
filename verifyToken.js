const config=require('./config/env')
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
module.exports=(authorization)=>{
    return new Promise((resolve,reject)=>{
        const authHeader = authorization;
       if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if(token){
        request({
            url: `https://cognito-idp.${config.pool_region}.amazonaws.com/${config.UserPoolId}/.well-known/jwks.json`,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                pems = {};
                var keys = body['keys'];
                for(var i = 0; i < keys.length; i++) {
                    var key_id = keys[i].kid;
                    var modulus = keys[i].n;
                    var exponent = keys[i].e;
                    var key_type = keys[i].kty;
                    var jwk = { kty: key_type, n: modulus, e: exponent};
                    var pem = jwkToPem(jwk);
                    pems[key_id] = pem;
                }
                var decodedJwt = jwt.decode(token, {complete: true});
                if (!decodedJwt) {
                    reject(null);
                }
                else{

                var kid = decodedJwt.header.kid;
                var pem = pems[kid];
                if (!pem) {
                    reject(null);
                }
                else{
                jwt.verify(token, pem, function(err, payload) {
                    if(err) {
                        reject(null);
                    } else {
                        console.log("Valid Token.");
                        resolve(payload);
                    }
                });
            }
                }
            } else {
                reject(null);
            }
        });
        }else{
            reject(null)
        }
    }else{
        reject(null)
    }
    })
}