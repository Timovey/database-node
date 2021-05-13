const db = require('../consetting')
const del = require('../madedelete/returndelete')
const fs = require('fs')
const path = require('path');
const filePath = path.join(__dirname, '../log/post.txt')
class CustomerController {

    async createCustomer(req, res) {
        try {
            //console.log("sdccds");
            const { name, surname } = req.body
            var t1 = new Date();
            const newCustomer = await db.query('INSERT INTO Customer (Name, Surname) values ($1, $2) RETURNING Name, Surname', [name, surname])
            var t2 = new Date();
            var string = `\nINSERT INTO Customer (Name, Surname) values ($1, $2) RETURNING Name, Surname ... TIME: ${t2-t1}`;
            //console.log(string);
            fs.appendFileSync(filePath , string, function(err) {
            });
            res.json(newCustomer.rows[0]).status(200);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getAllCustomers(req, res) {
        try {
            //console.log("scdsdc");
            var t1 = new Date();
            const Customers = await db.query('SELECT * From Customer');
            var t2 = new Date();
            var string = `\nSELECT * From Customer ... TIME: ${t2-t1}`;
            //console.log(string);
            fs.appendFileSync(filePath , string, function(err) {
            });
            res.json(Customers.rows);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };


    async getCustomer(req, res) {
        try {
            const Name = req.query.name;
            const Surname = req.query.surname;

            const Customer = await db.query('SELECT id_customer From Customer WHERE Name = $1 AND Surname = $2', [Name, Surname]);

            res.json(Customer.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
    async updateCustomer(req, res) {
        try {
            const { id, name, surname} = req.body;
       // console.log(req.body);
            const Customer = await db.query('UPDATE Customer set Name = $1, Surname = $2 WHERE id_customer = $3 RETURNING Name, Surname', [name, surname, id]);
          //  console.log('sdc');
            res.json(Customer.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }


    async deleteCustomer(req, res) {
        try {
            const Name = req.query.name;
            const Surame = req.query.surname;

            const Customer = await db.query('DELETE From Customer WHERE Name = $1 AND Surname = $2', [Name, Surame]);

            del.makeDeleteFile('customer');
            res.sendFile(path.join(__dirname, '../views/delete.one.html'));
           //res.json("Delete");
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
}

module.exports = new CustomerController()
