create database bamazon;
use bamazon;
create table Products (
	ItemID int NOT NULL auto_increment,
    ProductName varchar(50),
    DepartmentName varchar(50),
    Price float(99,2),
    StockQuantity int NOT NULL,
    constraint PRIMARY KEY (ItemID)
);
INSERT INTO	Products (ProductName, DepartmentName, Price, StockQuantity)
	values ('Camera', 'Electronics', 99.99, 12);
INSERT INTO	Products (ProductName, DepartmentName, Price, StockQuantity )
	values ('Banana', 'Produce', .85, 40);
INSERT INTO	Products (ProductName, DepartmentName, Price, StockQuantity )
	values ('Hammer', 'Tools', 24.99, 10);
INSERT INTO	Products (ProductName, DepartmentName, Price, StockQuantity )
	values ('Number 1 Dad Mug', 'Glasswear', 8.99, 3);
INSERT INTO	Products (ProductName, DepartmentName, Price, StockQuantity )
	values ('Cards Against Humanity', 'Games', 32.50, 8); 
INSERT INTO	Products (ProductName, DepartmentName,  Price, StockQuantity)
	values ('Camry Cabin Air Filter',  'Automotive Parts', 14.89, 22);
INSERT INTO	Products (ProductName, DepartmentName, Price, StockQuantity)
 	values ('Diaper Genie Bag Refill', 'Baby', 12.99, 93);
 INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity )
	values ('Cat In the Hat', 'Books', 8.99, 15);
INSERT INTO	Products (ProductName, DepartmentName, Price, StockQuantity )
	values ('Backpack', 'Outdoor', 44.99, 15);
INSERT INTO	Products (ProductName, DepartmentName, Price, StockQuantity)
	values ('New Orleans Saints T-Shirt', 'Clothing', 19.99, 4);

