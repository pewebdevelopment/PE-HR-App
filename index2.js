const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: 'c562fcdb085a7745d41414249c0a3167-4d640632-2d59169a', domain: 'forums.paathshala.world'});
console.log(mg)
const data = {
	from: 'Excited User <paathshala.webdevelopment@gmail.com>',
	to: 'stephcuriejulie33@gmail.com',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
	console.log(body);
    console.log(error)
});