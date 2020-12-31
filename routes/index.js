var express = require('express');
var studentModule = require('../modules/student')
var router = express.Router();
var studentFind= studentModule.find({})

/* GET home page. */
router.get('/', function(req, res, next) {
  studentFind.exec(function(err,data){
    if(err) throw err;
    res.render('index', { title: 'Express',msg:'',records:data});
  });

});

router.post('/', function(req, res, next) {

  var name = req.body.name;
  var email = req.body.email;
  var etype = req.body.etype;

  var studentDetails = new studentModule({
    name:name,
    email:email,
    etype:etype,
  });

  studentDetails.save(function(err,doc){
    if(err) throw err;
    studentFind.exec(function(err,data){
      if(err) throw err;
      res.render('index', { title: 'Express',msg:'',records:data});
    });
  });
});
  


router.post('/search/', function(req, res, next) {
  var byName = req.body.byName;
  var byEmail = req.body.byEmail;
  
  if(byName != '' && byEmail != '')
  {
    fPara = { 
      $and:[{name: byName},{email:byEmail}]
    }
  }
  else if(byName != '' && byEmail == '')
  {
    fPara = { 
      $or:[{name: byName},{email:byEmail}]
    }
  }
  else
  {
    fPara={}
  }
    var studentFilter= studentModule.find(fPara)
    studentFilter.exec(function(err,data){
      if(err) throw err;
      res.render('index', { title: 'Express',msg:'',records:data});
    });
});

module.exports = router;
