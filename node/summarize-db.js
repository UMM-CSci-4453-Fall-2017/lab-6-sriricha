var credentials = require('./credentials.json');

var mysql=require("mysql");

credentials.host="ids";
var connection = mysql.createConnection(credentials);

var someVar = [];

connection.connect(function(err){
  if(err){
    console.log("Problems with MySQL: "+err);
  } else {
    console.log("Connected to Database.");
  }
});

connection.query('SHOW DATABASES',function(err,rows,fields){
  if(err){
    console.log('Error looking up databases');
  } else {
    setValue(rows);
    //console.log('Returned values were ',rows);
}
});


function setValue(value){
        someVar = value;
	for(i = 0; i < someVar.length; i++){
		credentials.database=someVar[i].Database;
	}
}

connection.end()
console.log("All done now.");
