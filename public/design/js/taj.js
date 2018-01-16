



fs = require("fs");
/* our question has {
	"id"                                  /// question's number ...
	"texture"                             /// text of question ...
	"type"   ,                            /// multipleChoice or inputOutput question ... etc
	"subject" ,                           /// Chemistry, Physics, Science or Programming ... etc
	"level"  ,                            /// Beginner, intermediate, advanced, expert or legendary ...
	"answer" = [{choice , correct}]           /// wrong and correct answers as pair of string and tag for correct answer 
 }

*/	
/*

      obj = {
	         "nameOFcont" , 
			 "questions",
			 "preiod"}
			 
			 */
			 
module.exports  = { 
			"insert" : function (  ques , name , time , JSONnum  )
             {
			 
			 
			 var contest = [];
			 "E:\Faculty of Information Technology Engineering\the last virsion of our project\The main project\cplusplus"
			      var filename = ( JSONnum == 1 ? './public/design/previousContest/CplusplusData.json' : (JSONnum == 2 ? './public/design/previousContest/HTMLData.json' : ( JSONnum == 3 ? './public/design/previousContest/javeData.json' : './public/design/previousContest/JSData.json' ) ) );

			     fs.readFile(filename , "utf8" ,  function(err, content) {
                              if (err) return err;
							  contest=JSON.parse(content);
							  contest.contest.push( {
							      "nameOFcont" : name , 
								  "questions"  :  ques , 
								  "period" : time 
							  
							  } )  ;
	               
				   fs.writeFile( filename , JSON.stringify(contest), 'utf8', function(err){
					if(err) throw err;
				});
				      
					  
					  
					  
					  
				   
	         });
   
             }	


}			 
	  
	  
	  

