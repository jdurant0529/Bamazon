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

    }); //  end of con.connect function --- database has been connected.


    function allProducts() {
        con.query('SELECT * FROM products', function(err, result) {
            if (err) throw err;

            console.log('Data received from Db:\n');

            var strBreak = '------------------';
            var choiceOPT = [];
            var stockQTY = [];
            var costPRICE = [];

            for (var i = 0; i < result.length; i++) {

                console.log(result[i].ItemID + " | " + result[i].DepartmentName);
                console.log(strBreak);
                console.log("	Product             : " + result[i].ProductName);
                console.log("	Price               : " + result[i].Price);
                console.log("	Quantity Available  : " + result[i].StockQuantity);
                console.log('');
                choiceOPT.push("" + result[i].ItemID);
                stockQTY.push("" + result[i].StockQuantity);
                costPRICE.push("" + result[i].Price)
            }

            selection(choiceOPT, stockQTY, costPRICE)

        })
    } //end of allProducts function...

    function selection(opt, qty, price) {

        inquirer.prompt([{
                type: "list",
                name: "option",
                message: "What is the itemID of the item you would like to purchase?",
                choices: opt
            }, {

                type: "input",
                message: "How Many do you want?",
                name: "quantity"
            }

        ]).then(function(choices) {

            var idx = choices.option - 1;
            var grandTotal = choices.quantity * price[idx];
//            var cost = choices.quantity * price[idx];
            console.log("item id: " + opt[idx]);
            console.log("quantity available: " + qty[idx]);
            console.log("quantity wanted: " + choices.quantity);
            

            if (parseInt(choices.quantity) > parseInt(qty[idx])) {
                console.log("You can't have that many.  Bamazon doesn't have enough available.");
                con.end();
            } else {
                // console.log('You have successfully purchased ' + choices.quantity + ' of item ID ' + opt[idx] );

                // console.log('This cost a grand total of ' + cost);
                choices.quantity = qty[idx] - choices.quantity;
			console.log("Price of individual item: " + price[idx]);
            console.log('Grand total of all products purchased: ' + grandTotal);
                purchase(choices);
            }

        })

        function purchase(choices) {
            
            var setStock = {StockQuantity: parseInt(choices.quantity)}
            var itemChange = { ItemID: choices.option};

            con.query('update products set ? where ?', [setStock, itemChange], function(err, res) {
                if (err) throw err;
            	console.log('Purchase Completed');
            	con.end();
            })
        }
    }
    allProducts();
}

bamazon();
