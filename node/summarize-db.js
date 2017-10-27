var credentials = require('./credentials.json');

var mysql=require("mysql");
var bool = false;
credentials.host="ids";
var connection = mysql.createConnection(credentials);

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
    for(var j in rows) {
	console.log("---|" + rows[j].Database + ">");
	getTables(rows[j].Database, j, rows.length);	  	
    }
   	  
		
}
});


function getDescription(dB, tableName, index, length, indexTable, lengthTable){
  connection.query('DESCRIBE ' + dB + '.' + tableName, (function(tableName) {return function(err, rows, fields){
    if(err){
      console.log('errors');
    } 
    else{
      console.log(".....|" + dB + "." + tableName + ">");
      for(var j in rows) {      
      	console.log("        FieldName: " + "`" + rows[j].Field + "`" +  "     (" + rows[j].Type + ")");
      	if(index == (length - 2) && indexTable == (lengthTable - 1)) {
        	connection.end();
		return;
      	}
     }
    }
	
    
  }})(tableName));
  
}

function getTables(name, index, length){
  connection.query('SHOW TABLES FROM ' + name, (function(name) {return function(err, tables, fields){
  if(err){
    console.log('error tables');
  } else{
       console.log("---|" + name + ">");
       for(var k in tables) {
	var tmpStr2 = "Tables_in_"+ name;
	getDescription(name, tables[k][tmpStr2], index, length, k, tables.length);
    }
   
  }
  
  
  }})(name));
}

