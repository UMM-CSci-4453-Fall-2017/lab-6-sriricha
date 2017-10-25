var async=require('async');

var credentials = require('./credentials.json');

var mysql=require("mysql");

credentials.host="ids";
var connection = mysql.createConnection(credentials);

var users = [];
var databaseNames = [];
var tableNames = [];
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
				 	console.log(databaseNames[i]);
				}
				callback();
			}
		});
		
	},
	function(callback) {
		for(var i in databaseNames) {
			console.log(databaseNames[i]);
			var tempStr = 'SHOW TABLES FROM '+databaseNames[i];
			connection.query(tempStr, function(err, tables, fields) {
				if(err) {
					console.log('Error looking up tables');
				} else {
					console.log(tables);
				}
			});
		}
		callback();
	},
	function(callback) {
		connection.end()
		console.log("All done now.");
		callback();
	}

]);

