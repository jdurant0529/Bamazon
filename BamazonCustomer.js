var mysql = require("mysql");
var prompt = require('prompt');



// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query('SELECT * FROM bamazon.products',function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
});


prompt.start();
prompt.get(['ID', 'quantity'], function (err, result) {
    // 
    // Log the results. 
    // 
    console.log('Command-line input received:');
    console.log('you chose item: ' + result.ID);
    console.log('you chose ' + result.quantity + ' of that item.');
  });