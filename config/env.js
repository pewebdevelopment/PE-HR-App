require('dotenv').config()



config = {
    mongodblocal: {
        connectionString:"mongodb+srv://Admin:admin@cluster0.cxrgl.mongodb.net/test"
    },
    PORT:5000,
    /*pool_region :'us-east-2',
    UserPoolId : "us-east-2_gbGsTviN1",    
    ClientId : "5mancm4soeolgeii6aa01p6lm4",*/
    pool_region :'ap-south-1',
    UserPoolId : "ap-south-1_n75iYQRxh",    
    ClientId : "78hg39ucp4rprhrgp0bes9nuu8",
    mailgun_api_key : process.env.MAILGUN_API_KEY,
    mailgun_domain : process.env.MAILGUN_DOMAIN
}
module.exports = config