var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ecucation2588:12345@cluster0.tg6yw.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});


var conn= mongoose.connection;

var studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    etype: String,
});

var studentModule = mongoose.model('Student', studentSchema);

module.exports = studentModule;