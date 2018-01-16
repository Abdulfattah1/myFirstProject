
var fs = require('fs');
var shuffle = require('knuth-shuffle').knuthShuffle;

/*  our user has {
    "Username"  ,
	"Password"  ,
	"Email"     ,
	"Firstname" ,
	"Lastname"
}
	
*/

/* our question has {
	"id"                                  /// question's number ...
	"texture"                             /// text of question ...
	"type"   ,                            /// multipleChoice or inputOutput question ... etc
	"subject" ,                           /// Chemistry, Physics, Science or Programming ... etc
	"level"  ,                            /// Beginner, intermediate, advanced, expert or legendary ...
	"answer" = [{choice , correct}]           /// wrong and correct answers as pair of string and tag for correct answer 
 }

*/	


module.exports  = { 
	"getCurContest":function (createdContest) 
	{
		     var usr ;
			 var allcontest = "<ul class='list-unstyled'>" ; 
			 createdContest.forEach(function (itm){
			 usr = itm.name + "user";
		     has_time = "" + itm.start + "&" + (itm.period) + "";  
		     allcontest+= '<li class="LI_Contest " style ="color:black" id =  ' +itm.name+ '><span id = '+has_time+'  >'
		     +'<div id='+ itm.name+"timer"+' >' 
		     +'<h1 style:"display:block">'+itm.name+'</h1>'
		     +'<div class="TT">'
		     +'<span class="minutes"></span>'
		     +' :' 
		     +'  <span class="seconds">'
		     +'</span></div	>';
	         allcontest+='<div><input class="form-control Form_Contest" type = "text" placeholder="Type Your Name" id = ' +usr+ ' ><button value = ' + itm.name + ' onclick = "joinPlyer(this)" class="Button_Contest1 btn btn-block btn-danger"  > join </button></div></span></li>';  
			 });
			 
			 allcontest+= "</ul>";
			 return allcontest;
	},





   "resulte" : function (req  , data ){
	     var Name     = req.body.Username.trim();
		 var Password = req.body.Password.trim();
		 console.log(Name + " --> " + Password);
         var arrayOfUsers = JSON.parse(data);
		 var equals = arrayOfUsers.users.filter(function(obj){
			 	
				return (obj.Username == Name && obj.Password == Password);}
		);
       
	   if(equals.length > 0){
		   return true;
	   }else{
		   return false;
	   }	

   }
   ,
   "checkfile" : function ( JSONnum , callback) {

   var filename = ( JSONnum == 1 ? './public/ques/CplusplusData.json' : (JSONnum == 2 ? './public/ques/HTMLData.json' : ( JSONnum == 3 ? './public/ques/javeData.json' : './public/ques/JSData.json' ) ) );
  fs.readFile(filename , "utf8" ,  function(err, content) {
    if (err) return callback(err);
		callback(null, content);
	});
   }	
   ,
   "appendNewUser" : function(req , data){
	   
	var arrayOfUsers = JSON.parse(data);
	
	    /// append ...
		var obj = {} ; 
		obj.Username           = req.body.Username.trim() ;
	    obj.Password           = req.body.Password.trim() ;
	    obj.Email              = req.body.Email.trim()    ;     
	    obj.Firstname          = req.body.Firstname.trim();
		obj.Lastname           = req.body.Lastname.trim();
		arrayOfUsers.users.push(obj);
		
		/*fs.writeFile('helper/usersData.json', JSON.stringify(arrayOfUsers), 'utf-8', function(err) {
	  if (err) throw err;

});
	   */
   
   }
   ,
    "RandomSort" : function (array) {
        var n = array.length, i = -1, j, k;
        while (++i < n) {
          j = Math.floor(Math.random() * n);
          k = Math.floor(Math.random() * n);
          t = array[j];
          array[j] = array[k];
          array[k] = t;
        }
   }
   ,
   "getArrayOfQuestion" : function (JSONnum) {
	   
   var filename = ( JSONnum == 1 ? './public/ques/CplusplusData.json' : (JSONnum == 2 ? './public/ques/HTMLData.json' : ( JSONnum == 3 ? './public/ques/JAVAData.json' : './public/ques/JSData.json' ) ) );
        var contents = fs.readFileSync(filename, 'utf8');
        var arrayOfQuestions = JSON.parse(contents);
		shuffle(arrayOfQuestions.question) ; 
		return arrayOfQuestions.question ; 
		
   } 
   ,
   "generateQuestion" : function(data){
	   var arrayOfQuestions = JSON.parse(data);
	   return arrayOfQuestions.question[getRandomNumber(0 , arrayOfQuestions.question.length)];
   }
	,
	"insert" : function (  ques , name , time , creater ,  JSONnum  )
             {
			 
			 
			 var contest = [];
 			      var filename = ( JSONnum == 1 ? './public/design/previousContest/CplusplusData.json' : (JSONnum == 2 ? './public/design/previousContest/HTMLData.json' : ( JSONnum == 3 ? './public/design/previousContest/JAVAData.json' : './public/design/previousContest/JSData.json' ) ) );

			     fs.readFile(filename , "utf8" ,  function(err, content) {
                              if (err) return err;
							  contest=JSON.parse(content);
							  contest.contest.push( {
							      "nameOFcont" : name    , 
								  "questions"  : ques    ,
                                  "creater"    : creater , 								  
								  "period"     : time 
							  
							  } )  ;
	               
				   fs.writeFile( filename , JSON.stringify(contest), 'utf8', function(err){
					if(err) throw err;
				});
				      
					  
					  
					  
					  
				   
	         });
   
             }	
             ,
	"addQuestion" : function (req){
		
		var JSONnum = req.body.LAN;
		var filename = ( JSONnum == 1 ? './public/ques/CplusplusData.json' : (JSONnum == 2 ? './public/ques/HTMLData.json' : ( JSONnum == 3 ? './public/ques/javeData.json' : './public/ques/JSData.json' ) ) );
        fs.readFile(filename , "utf8" ,  function(err, content) {
              if (err) throw err;
		        var arrayOfQuestions = JSON.parse(content);
				console.log( " HELLO  INSIDE FUNCTION \n\n");
				
				req.body.questions.forEach( function( itm ){
					console.log( itm.texture + "\n" );
				arrayOfQuestions.question.push(itm);	
				});
				
				
				console.log( " the last quetion \n\n" );
				console.log(  arrayOfQuestions.question[arrayOfQuestions.question.length-1].texture )   ;
				
				fs.writeFile( filename , JSON.stringify(arrayOfQuestions), 'utf8', function(err){
					if(err) throw err;
				});
				
	           });
			
	}
	,
	"getRaiminingTime" : function(start , totalTime){
		return totalTime - (new Date().getTime()- start) ;
	}
	,
	"reorder" : function(array , name) {
		for( i = 0 ; i < array.length ; i ++  ){
		 if( array[i].user == name ){
			 array[i].score++;
			 break;
		 }
		}
		sortArrayByscore(array);
	}
	,
"getPreContests" : function( contestsArray , ListOfHallOfScore  ){
		
		console.log( "here the function : \n\n\n" );
		/*****************************  previous contests ***********************************************/
			  var baseURL = "./public/design/previousContest/";
			  var precont = [];
			  var nameUSR = "NAMEUSR" ;
			  var type = "Pretpye" ;
			  var allprevcontest1 =[];
			  var prev_Cplus ="";
			  var prev_Java ="";
			  var prev_js ="";
			  var prev_Html="";
			  
			  /********* ******* reaad cplusplus **********************/
			  content = fs.readFileSync( baseURL + "CplusplusData.json" , "utf8" )
  				  precont = JSON.parse(content);
				  //prev_Cplus += "<h2  style = 'display:block'> C plus plus contests  : </h2>";
				  prev_Cplus += "<ul class='list-unstyled'>";
                  precont.contest.forEach( function(itm){
 					  /*****************************************************************************/
					  ListOfHallOfScore[itm.nameOFcont] = [ ] ;
					  contestsArray[itm.nameOFcont] =  {
				      "question"      : itm.questions        , 
					  "NameOfContest" : itm.nameOFcont  ,
					  "startTime"     : 000      ,
					  "totalTime"     : itm.period    ,
                      "language"      : 1				  
			          } ;
					   /********************************************************************/
					  nameUSR =  "NAMEUSR" + itm.nameOFcont ;
					  type    =  "Pretpye" + itm.nameOFcont;
 					  prev_Cplus += "<li class='LI_Contest hvr-wobble-to-top-right'>"+
 					  "<h2  style = 'display:block' class='hContest' id = "+type+" ><span id = '1'></span> "+itm.nameOFcont+" </h2>"
					  prev_Cplus += "<h2  class='hContest' style = 'display:block'> created By "+itm.creater+"</h2>";
					  prev_Cplus += "<input class='form-control Form_Contest' type = 'text' id = "+nameUSR+" >";
					  prev_Cplus += "<button class='Button_Contest btn btn-danger'value = " + itm.nameOFcont + " onclick = 'goToPreContest(this)' > practice </button>";
 				      prev_Cplus += "</li>"

				 } );				  
				  
			  prev_Cplus+= "</ul>";








			 /********* ******* reaad Java **********************/
			  content = fs.readFileSync( baseURL + "JAVAData.json" , "utf8" );
  				  precont = JSON.parse(content);
				  //prev_Java += "<h2  style = 'display:block'> Java contests  : </h2>";
				  prev_Java += "<ul>";
                  precont.contest.forEach( function(itm){
 					  /*****************************************************************************/
					  ListOfHallOfScore[itm.nameOFcont] = [ ] ;
					  contestsArray[itm.nameOFcont] =  {
				      "question"      : itm.questions        , 
					  "NameOfContest" : itm.nameOFcont  ,
					  "startTime"     : 0000      ,
					  "totalTime"     : itm.period    ,
                      "language"      : 3				  
			          } ;
					   /********************************************************************/
					  nameUSR =  "NAMEUSR" + itm.nameOFcont ;
					  type    =  "Pretpye" + itm.nameOFcont;
					  prev_Java += "<li> <h2  style = 'display:block' id = "+type+"  ><span id = '3'></span> "+itm.nameOFcont+" </h2>"
					  prev_Java += "<h2  style = 'display:block'> created By "+itm.creater+"</h2>";
					  prev_Java += "<input type = 'text' id = "+nameUSR+"  >";
					  prev_Java += "<button value = " + itm.nameOFcont + " onclick = 'goToPreContest(this)' class='btn btn-lg btn-danger'  > practice </button>";
 				      prev_Java += "</li>"

				 } );				  
				  
			  prev_Java+= "</ul>";






			 /********* ******* reaad JS **********************/
			 content =  fs.readFileSync( baseURL + "JSData.json" , "utf8")
				  
 				  precont = JSON.parse(content);
				  //prev_js += "<h2  style = 'display:block'> Java Script contests  : </h2>";
				  prev_js += "<ul>";
                  precont.contest.forEach( function(itm){
 					  /*****************************************************************************/
					  ListOfHallOfScore[itm.nameOFcont] = [ ] ;
					  contestsArray[itm.nameOFcont] =  {
				      "question"      : itm.questions        , 
					  "NameOfContest" : itm.nameOFcont  ,
					  "startTime"     : 0000      ,
					  "totalTime"     : itm.period    ,
                      "language"      : 4				  
			          } ;
					   /********************************************************************/
					    nameUSR =  "NAMEUSR" + itm.nameOFcont ;
					   type    =  "Pretpye" + itm.nameOFcont;
					  prev_js += "<li><h2  style = 'display:block' id = "+type+"  ><span id = '4'></span> "+itm.nameOFcont+" </h2>"
					  prev_js += "<h2  style = 'display:block'> created By "+itm.creater+"</h2>";
					  prev_js += "<input type = 'text' id = "+nameUSR+"  >";
					  prev_js += "<button value = " + itm.nameOFcont + " onclick = 'goToPreContest(this)' class='btn btn-lg btn-danger'  > practice </button>";
 				      prev_js += "</li>"

				 } );				  
				   
			  
			  prev_js+= "</ul>";
			  /********* ******* reaad HTML **********************/ 
			  content =  fs.readFileSync( baseURL + "HTMLData.json" , "utf8")
  				  precont = JSON.parse(content);
				  //prev_Html += "<h2  style = 'display:block'> Java contests  : </h2>";
				  prev_Html += "<ul>";
                  precont.contest.forEach( function(itm){
 					  /*****************************************************************************/
					  ListOfHallOfScore[itm.nameOFcont] = [ ] ;
					  contestsArray[itm.nameOFcont] =  {
				      "question"      : itm.questions        , 
					  "NameOfContest" : itm.nameOFcont  ,
					  "startTime"     : 0000      ,
					  "totalTime"     : itm.period    ,
                      "language"      : 2				  
					  
			          } ;
					   /********************************************************************/
					    nameUSR =  "NAMEUSR" + itm.nameOFcont ;
					   type    =  "Pretpye" + itm.nameOFcont;
					  prev_Html += "<li> <h2  style = 'display:block' id = "+type+" ><span id = '2'></span> "+itm.nameOFcont+" </h2>"
					  prev_Html += "<h2  style = 'display:block'> created By "+itm.creater+"</h2>";
					  prev_Html += "<input type = 'text' id = "+nameUSR+"  >";
					  prev_Html += "<button value = " + itm.nameOFcont + " onclick = 'goToPreContest(this)' class='btn btn-lg btn-danger'  > practice </button>";
 				      prev_Html += "</li>"

				 } );				  
			  
			  prev_Html+= "</ul>";





			 allprevcontest1.push(prev_Cplus);
			 allprevcontest1.push(prev_Java);
			 allprevcontest1.push(prev_js);
			 allprevcontest1.push(prev_Html);
			 return allprevcontest1;
		
	} 
	
};
	
function sortArrayByscore(array){
	array.sort( function(a , b ) { 
	       return b.score - a.score ; 
	           }  );
	
	};
function getRandomNumber(min , max){
	return (Math.floor(Math.random() * (max - min )) + min);
} 

