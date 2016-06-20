function bamazon() {
    var mysql = require("mysql");
    var inquirer = require('inquirer');

    // First you need to create a connection to the db
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "bamazon"

    });

    con.connect(function(err) {
        if (err) {
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');

    });

    function options(){
    inquirer.prompt([
    {
        type: "list",
  name: "task",
  message: "What would you like to do?",
  choices: [
    "1) View Products for Sale",
    "2) View Low Inventory",
    "3) Add to Inventory",
    "4) Add New Product"
    ]
   },
])
   
    }
    options();
}
bamazon();
