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

            for (var i = 0; i < result.length; i++) {

                console.log(result[i].ItemID + " | " + result[i].DepartmentName);
                console.log(strBreak);
                console.log("	Product             : " + result[i].ProductName);
                console.log("	Price               : " + result[i].Price);
                console.log("	Quantity Available  : " + result[i].StockQuantity);
                console.log('');
                choiceOPT.push("" + result[i].ItemID);
                stockQTY.push("" + result[i].StockQuantity);

            }

            selection(choiceOPT, stockQTY)

        })
    } //end of allProducts function...

    function selection(opt, qty) {
    	
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
            console.log("item id: " + opt[idx]);
            console.log("quantity available: " + qty[idx]);
            console.log("quantity wanted: " + choices.quantity);

            if (parseInt(choices.quantity) > parseInt(qty[idx])) {
                console.log("You can't have that many.  Bamazon doesn't have enough available.");
                con.end();
            } else {
                console.log('You have successfully purchased ' + choices.quantity + ' of item ID ' + opt[idx]);
                choices.quantity = qty[idx] - choices.quantity;
                

                purchase(choices);
            }

        })

        function purchase(choices) {
            //console.log('Inside purchase function!!!');
            
            var setStock = {StockQuantity: parseInt(choices.quantity)}
            var itemChange = { ItemID: choices.option};
            // var setStock = {StockQuantity: '10'};
            // var itemChange = {ItemID: '1'};

            // console.log(set);
            // console.log(where);
            // con.query('update products set StockQuantity = 10 where ItemID = 1', function(err, res){ 
            // })
            con.query('update products set ? where ?', [setStock, itemChange], function(err, res) {
                if (err) throw err;
            	console.log('You have successfully purchased ' +  );
            })
        }

        //     // con.query('update products set ? where ?', set, where, function(err, res) {
        //     //         if (err) throw err;
        //     //         console.log(res);

        //     //     }) //end con.query
        // } // end of else statement

        // function purchase(selection) {
        //     console.log(selection);
    }
    allProducts();
}

bamazon();
