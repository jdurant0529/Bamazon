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

    function options() {
        ///start of options function -- list options and start proper function depending on requested task
        inquirer.prompt([{
                type: "list",
                name: "task",
                message: "What would you like to do?",
                choices: [
                    "1) View Products for Sale",
                    "2) View Low Inventory",
                    "3) Add to Inventory",
                    "4) Add New Product"
                ]
            }, ]).then(function(tasks) {
                console.log(tasks);
                console.log(tasks.task);
                switch (tasks.task) {
                    case "1) View Products for Sale":

                        viewAll();
                        break;
                    case "2) View Low Inventory":

                        viewLow();
                        break;
                    case "3) Add to Inventory":
                        inquirer.prompt([{
                                type: "input",
                                name: "idToAdd",
                                message: "Which item would you like to add additional inventory?",
                            }, {

                                type: "input",
                                message: "How many of that item would you like to add?",
                                name: "addlQty"
                            }

                        ]).then(function(addlInventory) {
                            // console.log(addlInventory);
                            addToInven(addlInventory.idToAdd, addlInventory.addlQty);
                        })

                        break;
                    case "4) Add New Product":
                        console.log('case 4');

                        //ProductName, DepartmentName, Price, StockQuantity
                        inquirer.prompt([{
                                type: "input",
                                name: "ProductName",
                                message: "What is the name of the new item?",
                            }, {

                                type: "input",
                                message: "What department does that item belong?",
                                name: "DepartmentName"
                            }, {
                                type: "input",
                                message: "How much do you want to charge for that item?",
                                name: "Price"
                            }, {
                                type: "input",
                                message: "How many of that item do you have in-stock?",
                                name: "StockQuantity"
                            }

                        ]).then(function(newItem) {
                            addNewProd(newItem);

                        })

                        break;
                }
            }) //end of then function for inquirer

    } // end of options function...

    function viewAll() {
        console.log('');
        con.query('SELECT * FROM products', function(err, result) {
            if (err) throw err;

            var strBreak = '------------------';

            for (var i = 0; i < result.length; i++) {

                console.log("Item ID #" + result[i].ItemID + " | " + "Department Name: " + result[i].DepartmentName);
                console.log(strBreak);
                console.log("   Product             : " + result[i].ProductName);
                console.log("   Price               : " + result[i].Price);
                console.log("   Quantity Available  : " + result[i].StockQuantity);
                console.log('');
            }

            options();

        })
    }

    function viewLow() {
        console.log('');
        con.query('SELECT * FROM products where StockQuantity <= 5', function(err, result) {
            if (err) throw err;

            var strBreak = '------------------';

            for (var i = 0; i < result.length; i++) {

                console.log("Item ID #" + result[i].ItemID + " | " + "Department Name: " + result[i].DepartmentName);
                console.log(strBreak);
                console.log("   Product             : " + result[i].ProductName);
                console.log("   Price               : " + result[i].Price);
                console.log("   Quantity Available  : " + result[i].StockQuantity);
                console.log('');
            }

            options();

        })
    }

    function addToInven(id, addl) {

        con.query('Select StockQuantity from products where ?', { ItemID: id }, function(err, result) {
                if (err) throw err;
                newInv = parseInt(result[0].StockQuantity) + parseInt(addl);


                var setStock = { StockQuantity: newInv }
                var itemChange = { ItemID: id };
                // console.log(setStock);
                // console.log(itemChange);
                con.query('update products set ? where ?', [setStock, itemChange], function(err, res) {
                        if (err) throw err;
                        console.log('inventory updated'); // maybe do select for only item changed...


                    }) // end of update query
                con.query('SELECT * FROM products where ?', [setStock], function(err, result) {
                    if (err) throw err;

                    var strBreak = '------------------';

                    for (var i = 0; i < result.length; i++) {

                        console.log("Item ID #" + result[i].ItemID + " | " + "Department Name: " + result[i].DepartmentName);
                        console.log(strBreak);
                        console.log("   Product             : " + result[i].ProductName);
                        console.log("   Price               : " + result[i].Price);
                        console.log("   Quantity Available  : " + result[i].StockQuantity);
                        console.log('');
                    }

                })
            }) // end of select query 

        options();
    } // end of addtoInven function 


    function addNewProd(newItem) {

        con.query('INSERT INTO products SET ?', newItem, function(err, result) {
            if (err) throw err;
            console.log('');
            con.query('Select * from products where ?', { ItemID: result.insertId }, function(err, result) {
                if (err) throw err;
                var strBreak = '------------------';

                for (var i = 0; i < result.length; i++) {

                    console.log("Item ID #" + result[i].ItemID + " | " + "Department Name: " + result[i].DepartmentName);
                    console.log(strBreak);
                    console.log("   Product             : " + result[i].ProductName);
                    console.log("   Price               : " + result[i].Price);
                    console.log("   Quantity Available  : " + result[i].StockQuantity);
                    console.log('');
                }
                options();
            })
        })

    }
    options();
}
bamazon();
