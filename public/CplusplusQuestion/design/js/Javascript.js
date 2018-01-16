var connect=require('connect');

var app=connect()
     .use(connect.static('public'))
     .use(function(req,res){
     }).listen(4000);