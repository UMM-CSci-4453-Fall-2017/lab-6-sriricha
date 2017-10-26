var credentials = require('./credentials.json');

var mysql=require("mysql");

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
    
    for(j = 0; j < rows.length; j++) {
		  getTables(rows[j].Database);
		  console.log(rows[j].Database);
		}
		
}


});


function getDescription(dB, tableName){
  console.log(tableName);
  connection.query('DESCRIBE ' + dB + '.' + tableName, function(err, rows, fields){
    if(err){
      console.log('errors');
    } else{
      console.log(rows[0].Field + ' ' + rows[0].Type);
    }
    
    connection.end();
  });
  
}

function getTables(name){
	connection.query('SHOW TABLES FROM ' + name, function(err, tables, fields){
  if(err){
    console.log('error tables');
  } else{
    for(var k in tables) {
				var tmpStr2 = "Tables_in_"+ name;
				getDescription(name, tables[k][tmpStr2]);
			}
			
  }
  
  
});
}

  

console.log("All done now.");