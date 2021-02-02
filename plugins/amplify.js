import Amplify , {Auth} from 'aws-amplify'


Amplify.configure({
    Auth: {

    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    //identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

    // REQUIRED - Amazon Cognito Region
    region: "ap-south-1",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
    // Required only if it's different from Amazon Cognito Region
 

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-south-1_rDf9FVsG5',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '1cs46ph3vpihfqo2o7c28u5rb7',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //     domain: '.yourdomain.com',
    // // OPTIONAL - Cookie path
    //     path: '/',
    // // OPTIONAL - Cookie expiration in days
    //     expires: 365,
    // // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    //     sameSite: "strict" | "lax",
    // // OPTIONAL - Cookie secure flag
    // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //     secure: true
    // },

    // OPTIONAL - customized storage object
    // storage: MyStorage,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH',

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    clientMetadata: { myCustomKey: 'myCustomValue' },

     // OPTIONAL - Hosted UI configuration
    oauth: {
        domain: 'your_cognito_domain',
        scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: 'http://localhost:8080/login',
        redirectSignOut: 'http://localhost:8080/login',
        responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
}
});

// You can get the current config object
const currentConfig = Auth.configure();