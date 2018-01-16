var express      = require('express');
var ejs          = require('ejs');
var fs           = require('fs');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var url          = require('url');
var read         = require('./routes/readfile');
var app          = express();
var http         = require('http') ;
var server       = http.createServer(app);
var io           = require('socket.io').listen(server);
var cookies      =require('cookies-js');

server.listen(3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res)
{
              var allcontest = read.getCurContest(createdContest);
			  var allprevcontest = [];
			  allprevcontest = read.getPreContests( contestsArray , ListOfHallOfScore  );

 			  
             res.render('index' , {title     :'Quiz Maker' , 
		                        LIST         :allcontest   ,
                                CPLUS        :allprevcontest[0],
                                JAVA         :allprevcontest[1],
                                JS           :allprevcontest[2],
                                HTML         :allprevcontest[3]
								})
	
								   
});


 

 app.get( '/CplusplusContest' , function(req , res ){
	 
	res.render('Cpluspluscontest' , {
		title : 'Cpluspluscontest'
	}); 
} );

app.get( '/Javacontest' , function(req , res ) {
		res.render('Javacontest' , {
		title : 'Javacontest'
	}); 
} )
app.get( '/HTMLcontest' , function(req , res ) {
		res.render('HTMLcontest' , {
		title : 'HTMLcontest'
	}); 
} )
app.get( '/JScontest' , function(req , res ) {
	
		res.render('JScontest' , {
		title : 'JScontest'
	}); 
} )

app.get( '/server_crt_ques' , function( req , res  ){
 
 res.sendFile( path.join(__dirname+'/server_crt_ques.html') ); 
 	
})
app.post( '/server_crt_ques' , function( req , res  ){
 
  /// write on dataBase ...
  
  read.addQuestion(req);
 
})



 app.get('/user_created_contest', function(req, res){
  res.render('User_Create');
});					   
app.post( '/user_created_contest' , function(req , res){


	  console.log( "start time : " + req.body.ST + "\n"  );
     	createdContest.push( {
					           "name"   : req.body.nameOFcontest       ,
							   "start"  : new Date().getTime() ,
                               "period" : req.body.ST	     } 
                                );


		ListOfHallOfScore[req.body.nameOFcontest] = [ ] ;	
		   var indx = createdContest.length-1 ;
	   		setTimeout( function () {
		 
         		 createdContest.splice(0,1); 
		        io.sockets.in(req.body.nameOFcontest).emit('goToContest' , {"CONT" : req.body.nameOFcontest 
				                          , "LANG" : contestsArray[req.body.nameOFcontest].language  } );

		        
		 read.insert( req.body.questions , req.body.nameOFcontest , req.body.period ,req.body.creater ,req.body.LAN );  

		} , read.getRaiminingTime(new Date().getTime(), createdContest[indx].period ) );
		 
			contestsArray[req.body.nameOFcontest] =  {
				      "question"      : req.body.questions                  , 
					  "NameOfContest" : req.body.nameOFcontest              ,
					  "startTime"     : new Date().getTime()                ,
					  "totalTime"     : req.body.period                     ,
					  "language"      : req.body.LAN
			          };
 });  						   
app.get( '/CplusplusQuestion/:title' , function(req , res ) { 
	 
	var stringArr = req.url.split('/');
	var index = stringArr[2]  ; 	 
 	 res.render( 'Cplusplusquestions' ,   {
		title    :  contestsArray[index].NameOfContest                   ,
        question : 	contestsArray[index].question[0]                      ,
        period   :  read.getRaiminingTime( new Date().getTime(), contestsArray[index].totalTime) 		
	});
});					 
app.post( '/CplusplusQuestion/:title' , function(req , res ) {
	var stringArr = req.url.split('/');
	var index = stringArr[2]  ; 
	res.contentType('json');
	var topArr = contestsArray[index].question.length;
    if( topArr <  Number(req.body.numOFques)+1 ){
	res.send({
	    "question" : "#you have finished all question \n congradulation !!!" ,
		"answer"   : "no"
	 });
	}
	else if( topArr == Number(req.body.numOFques)+1 ){
		if(req.body.corect == 'yes'){ 
		res.send({
	    "question" : "#you have finished all question \n congradulation !!!" ,
		"answer"   : "yes"
	      });
		  read.reorder( ListOfHallOfScore[index] ,  req.body.player);
		}
		else {
			res.send({
	    "question" : "#you have finished all question \n congradulation !!!" ,
		"answer"   : "no"
	      });
		}
	}
				 
	else if(req.body.corect == 'yes'){ 
    res.send({
	    "question" : contestsArray[index].question[Number(req.body.numOFques)+1] ,
		"answer"   : "yes"
	 });
	   
      /*** reorder array of scores **************************/
	  read.reorder( ListOfHallOfScore[index] ,  req.body.player);
	 }else{
		 res.send({
	    "question" : contestsArray[index].question[Number(req.body.numOFques)+1] ,
		"answer"   : "no"
	 });
	 }
	
});


app.get( '/CplusplusQuestion/:title/scores' , function (req , res){

    var stringArr = req.url.split('/');
	var index = stringArr[2]  ;
	res.render( 'scores' ,{ title : "scores"          ,
                           score : ListOfHallOfScore[index]  });
 
}	);
/************************************************************************************************************************/
app.get( '/JavaQuestion/:title' , function(req , res ) { 
	 
	var stringArr = req.url.split('/');
	var index = stringArr[2]  ; 	 
	 res.render( 'Javaquestions' ,   {
		title    :  contestsArray[index].NameOfContest                   ,
        question : 	contestsArray[index].question[0]                      ,
        period   :  read.getRaiminingTime(new Date().getTime() , contestsArray[index].totalTime) 		
	});
		       
		
});					   
app.post( '/JavaQuestion/:title' , function(req , res ) {
	
	var stringArr = req.url.split('/');
	var index = stringArr[2]  ; 
	res.contentType('json');
	var topArr = contestsArray[index].question.length;
	
    if( topArr <  Number(req.body.numOFques)+1 ){
	res.send({
	    "question" : "#you have finished all question \n congradulation !!!" ,
		"answer"   : "no"
	 });
	}
	
	else if( topArr == Number(req.body.numOFques)+1 ){
		if(req.body.corect == 'yes'){ 
		res.send({
	    "question" : "#you have finished all question \n congradulation !!!" ,
		"answer"   : "yes"
	      });
		  read.reorder( ListOfHallOfScore[index] ,  req.body.player);
		}
		else {
			res.send({
	    "question" : "#you have finished all question \n congradulation !!!" ,
		"answer"   : "no"
	      });
		}
	}
				 
	else if(req.body.corect == 'yes'){ 
    res.send({
	    "question" : contestsArray[index].question[Number(req.body.numOFques)+1] ,
		"answer"   : "yes"
	 });
	   
      /*** reorder array of scores **************************/
	  read.reorder( ListOfHallOfScore[index] ,  req.body.player);
	 }else{
		 res.send({
	    "question" : contestsArray[index].question[Number(req.body.numOFques)+1] ,
		"answer"   : "no"
	 });
	 }
});
app.get( '/JavaQuestion/:title/scores' , function (req , res){

    var stringArr = req.url.split('/');
	var index = stringArr[2]  ;
   res.render( 'scores' ,{ title : "scores"          ,
                           score : ListOfHallOfScore[index]  });
 
}	);
/***********************************************************************************************************************/
app.get( '/HTMLQuestion/:title' , function(req , res ) { 
	 
	var stringArr = req.url.split('/');
	var index = stringArr[2]  ; 	 
	 res.render( 'HTMLquestions' ,   {
		title    :  contestsArray[index].NameOfContest                   ,
        question : 	contestsArray[index].question[0]                      ,
        period   :  read.getRaiminingTime(new Date().getTime() , contestsArray[index].totalTime) 		
	});
				
});					   
						   

app.post( '/HTMLQuestion/:title' , function(req , res ) {
	
	var stringArr = req.url.split('/');
	var index = stringArr[2]  ; 
	res.contentType('json');
	var topArr = contestsArray[index].question.length;
	
    if( topArr <  Number(req.body.numOFques)+1 ){
	res.send({
	    "question" : "#you have finished all question \n congradulation !!!" ,
		"answer"   : "no"
	 });
	}
	
	else if( topArr == Number(req.body.numOFques)+1 ){
		if(req.body.corect == 'yes'){ 
		res.send({
	    "question" : "#you have finished all question \n congradulation !!!" ,
		"answer"   : "yes"
	      });
		  read.reorder( ListOfHallOfScore[index] ,  req.body.player);
		}
		else {
			res.send({
	    "question" : "#you have finished all question \n congradulation !!!" ,
		"answer"   : "no"
	      });
		}
	}
				 
	else if(req.body.corect == 'yes'){ 
    res.send({
	    "question" : contestsArray[index].question[Number(req.body.numOFques)+1] ,
		"answer"   : "yes"
	 });
	   
      /*** reorder array of scores **************************/
	  read.reorder( ListOfHallOfScore[index] ,  req.body.player);
	 }else{
		 res.send({
	    "question" : contestsArray[index].question[Number(req.body.numOFques)+1] ,
		"answer"   : "no"
	 });
	 }
});
app.get( '/HTMLQuestion/:title/scores' , function (req , res){

    var stringArr = req.url.split('/');
	var index = stringArr[2]  ;

	res.render( 'scores' ,{ title : "scores"          ,
                           score : ListOfHallOfScore[index]  });
 
}	);
/************************************************************************************************************************/
app.get( '/JSQuestion/:title' , function(req , res ) { 
	 
	var stringArr = req.url.split('/');
	var index = stringArr[2]  ; 	 
	 res.render( 'JSquestions' ,   {
		title    :  contestsArray[index].NameOfContest                   ,
        question : 	contestsArray[index].question[0]                      ,
        period   :  read.getRaiminingTime(new Date().getTime() , contestsArray[index].totalTime) 		
	});		       
});					   
app.post( '/JSQuestion/:title' , function(req , res ) {
	
	var stringArr = req.url.split('/');
	var index = stringArr[2]  ; 
	res.contentType('json');
	var topArr = contestsArray[index].question.length;
	
    if( topArr <  Number(req.body.numOFques)+1 ){
	res.send({
	    "question" : "#you have finished all question \n congradulation !!!" ,
		"answer"   : "no"
	 });
	}
	
	else if( topArr == Number(req.body.numOFques)+1 ){
		if(req.body.corect == 'yes'){ 
		res.send({
	    "question" : "#you have finished all question \n congradulation !!!" ,
		"answer"   : "yes"
	      });
		  read.reorder( ListOfHallOfScore[index] ,  req.body.player);
		}
		else {
			res.send({
	    "question" : "#you have finished all question \n congradulation !!!" ,
		"answer"   : "no"
	      });
		}
	}
	else if(req.body.corect == 'yes'){ 
    res.send({
	    "question" : contestsArray[index].question[Number(req.body.numOFques)+1] ,
		"answer"   : "yes"
	 });
	   
      /*** reorder array of scores **************************/
	  read.reorder( ListOfHallOfScore[index] ,  req.body.player);
	 }else{
		 res.send({
	    "question" : contestsArray[index].question[Number(req.body.numOFques)+1] ,
		"answer"   : "no"
	 });
	 }
});
app.get( '/JSQuestion/:title/scores' , function (req , res){

    var stringArr = req.url.split('/');
	var index = stringArr[2]  ;
    res.render( 'scores' ,{ title : "scores"          ,
                           score : ListOfHallOfScore[index]  }); 
});

app.get('/signin', function(req, res){
  res.render('signinPage');
});
app.post('/signin', function(req, res){
   res.render('done' , {
	  NAME :  req.body.name.trim() ,
	  PASS :  req.body.pass.trim() 
  });
});
	
app.get('/signup' , function(req, res){
  res.render('signup');
});

app.get('/tag' , function(req , res ){
	
	res.render('tag' , { str : req.url });
} );
app.get('/signin/signup',function(req,res){
  res.render('signup');
});
app.post('/signup', function(req, res){
   
   readfile.checkUsersfile(function (err, content) {
	   var sol = readfile.resulte(req , res , content);
     res.send(sol);
});   
   /*if(sol) {res.render('helloPage' , {
	 NAME :  req.body.name.trim() 
   });}else{
	   res.status(404).send('<h1> Faild loging </h1> <h3> make sure your input and restart log in </h3>');
   }*/
   
});


app.get( '/about' , function(req , res ){
	
	res.sendFile(path.join(__dirname+'/aboutPage.html'));
} );

 app.get( '/hello' , function(req , res){
	
	 res.sendFile(path.join(__dirname+'/hello .html'));
	 
 })  						   

app.get('/*', function(req, res) {
  res.status(404).send('<h1> Page is not found </h1>');
});




ListOfHallOfScore = {}       ///      username ... score 
checkedContest  = [] ; 
question = [] ; 
contestsArray = {} ;  /// index  = number of contest 
createdContest = [];
preContest = {};

io.sockets.on( 'connection' , function( socket ){
	 /// search if client is exactlly found .........
 	 
	
	
	 socket.on( 'submitContestPage' , function(data)
	 {
     	 ListOfHallOfScore[data.IDcontest] = [ ] ;		 
       	 createdContest.push( 
       	                         {
					           "name"   : data.IDcontest       ,
							   "start"  : new Date().getTime() ,
                               "period" : data.TTS     
                                 } 
                            );	
                    var indx = createdContest.length-1 ;	

       //	 console.log("TIME" + data.TTS);
	 // console.log("remain " + read.getRaiminingTime(new Date().getTime() , createdContest[indx].period )) ;
	 
	   		setTimeout( function () 
	   		{
		 
     		 createdContest.splice(0,1); 
	         io.sockets.in(data.IDcontest).emit('goToContest' ,
	          {"CONT" : data.IDcontest , "LANG" : contestsArray[data.IDcontest].language  } );

	      	},
	      	read.getRaiminingTime(new Date().getTime() , createdContest[indx].period ) );

							   
       	 question = read.getArrayOfQuestion(data.numType);
			contestsArray[data.IDcontest] =  
			        {
				      "question"      : question        , 
					  "NameOfContest" : data.IDcontest  ,
					  "startTime"     : new Date().getTime()      ,
					  "totalTime"     : data.period     ,
                      "language"      : data.numType				  
			        };
	     } );

		
	socket.on("addContestant" , function (data) {
   	socket.room = data ; 
	socket.join(data );
	} );
	

	 socket.on( "joinNewPlyer" , function(data){
   	 socket.username    = data.username;
	 socket.room        = data.CONTname ;

	 ListOfHallOfScore[data.CONTname].push( {
			"user"  : socket.username , 
			"score" : 0	 
		} );
	 socket.join(data.CONTname);
	
	 if( checkedContest.indexOf(data.CONTname) == -1 ){
		 
 		 
	 setTimeout( function () {
 		 
		 		io.sockets.in(socket.room).emit("showHallOfScore" , socket.room );
				checkedContest.splice(0,1);
	 } , read.getRaiminingTime(new Date().getTime(), contestsArray[socket.room].totalTime ) );

	 checkedContest.push(data.CONTname);
	 }
	
	});		
});

module.exports = app;





