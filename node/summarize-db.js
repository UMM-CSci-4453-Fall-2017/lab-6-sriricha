		var async=require('async');

		var credentials = require('./credentials.json');

		var mysql=require("mysql");

		credentials.host="ids";
		var connection = mysql.createConnection(credentials);

		var users = [];
		var databaseNames = [];
		var tableNames = [];
		var tmpMap = new Map();
		async.series([
			function(callback) {
				connection.connect(function(err){
					if(err){
						console.log("Problems with MySQL: "+err);
					} else {
						console.log("Connected to Database.");
					}
				});

				connection.query('SHOW DATABASES', function(err, rows, fields){
					if(err){
						console.log('Error looking up databases');
					} else {
						for(var i in rows) {
							databaseNames[i] = rows[i].Database;
						}
						callback();
					}
				});

			},
			function(callback) {
				var db;
				for(var j = 0; j < databaseNames.length; j++) {
					db = databaseNames[j];
					var tempStr = 'SHOW TABLES FROM '+ db;
					connection.query(tempStr, (function(db){return function(err, tables, fields) {
						if(err) {
							console.log('Error looking up tables');
						} else {
							for(var k in tables) {
								var tmpStr2 = "Tables_in_"+ db;
								tableNames[k] = tables[k][tmpStr2];
								var tableName = tableNames[k];
								findDescription(db, tableName);
							}
							console.log(tableNames.length);
						}
					}
					})(db));
				}

				callback();
			},
			function(callback) {
				//connection.end()
				console.log("All done now.");
				callback();
			}

		]);
		function findDescription(db, tableName){
			connection.query("DESCRIBE " + db + "." + tableName, function(err, rows, fields) {
				if (err) {
					console.log('lkj');
				}
				else {
					console.log("Hello");
				}
			})
			connection.end();
		}
