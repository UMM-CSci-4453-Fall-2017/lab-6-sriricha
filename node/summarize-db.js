var credentials = require('./credentials.json');

var mysql=require("mysql");
var str = "";
credentials.host="ids";
var connection = mysql.createConnection(credentials);

connection.connect(function(err){
  if(err){
    console.log("Problems with MySQL: "+err);
    connection.end();
  } else {
    console.log("Connected to Database.");
    console.log("      Acquiring data. This may take a bit...");
  }
});

connection.query('SHOW DATABASES',function(err,rows,fields){
  if(err){
    console.log('Error looking up databases');
    connection.end();
  } else {
    for(var j in rows) {
	getTables(rows[j].Database, j, rows.length);	  	
    }		
}
});


function getDescription(dB, tableName, index, length, indexTable, lengthTable){
  connection.query('DESCRIBE ' + dB + '.' + tableName, function(err, rows, fields){
    if(err){
      console.log('errors');
      connection.end();
    } 
    else{
      if (dB != str) {
        console.log("---|" + dB + ">");
	str = dB;      
      }	    
      console.log("......|" + dB + "." + tableName + ">");
      for(var j in rows) {      
      	console.log("        FieldName: " + "`" + rows[j].Field + "`" +  "     (" + rows[j].Type + ")");
      	if(index == (length - 2) && indexTable == (lengthTable - 1)) {
        	connection.end();
		return;
      	}
     }
    }  
  });
  
}

function getTables(name, index, length){
  connection.query('SHOW TABLES FROM ' + name, function(err, tables, fields){
  if(err){
    console.log('error tables');
    connection.end();
  } else{
       for(var k in tables) {
	var tmpStr2 = "Tables_in_"+ name;
	getDescription(name, tables[k][tmpStr2], index, length, k, tables.length);
    }
   
  }
  });
}

