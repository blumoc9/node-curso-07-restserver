
const jwt = require('jsonwebtoken');


const generateJWT = (uid= '')=>{
    return new Promise((resolve, reject) => {

        const payload = {uid};
        //https://www.npmjs.com/package/jsonwebtoken
        //jwt.sign(payload, secretOrPrivateKey, [options, callback])
        jwt.sign(payload,process.env.SECRETPRIVATEKEY,{
            expiresIn: '1h'
        },(err, token)=>{
            if(err){
                console.log(err);
                reject(`'Can't generate Token`);
            }else{
                resolve(token);
            }
        });

    });
}


module.exports = {
    generateJWT
}
