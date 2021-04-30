const db = require('../consetting')

class CustomerController {

    async createCustomer(req, res) {
        try {
            //console.log("sdccds");
            const { name, surname } = req.body
            const newCustomer = await db.query('INSERT INTO Customer (Name, Surname) values ($1, $2) RETURNING Name, Surname', [name, surname])
            res.json(newCustomer.rows[0]).status(200);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getAllCustomers(req, res) {
        try {
            console.log("scdsdc");
            const Customers = await db.query('SELECT Name, Surname From Customer');
            res.json(Customers.rows);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };


    async getCustomer(req, res) {
        try {
            const Name = req.query.name;
            const Surame = req.query.surname;
            //console.log(name);
            const Customer = await db.query('SELECT id_customer From Customer WHERE Name = $1 AND Surname = $2', [Name, Surame]);
            res.json(Customer.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
    async updateCustomer(req, res) {
        try {
            const { id, name, surname} = req.body;
            //console.log(req.body);
            const Customer = await db.query('UPDATE Customer set Name = $1, Surname = $2 WHERE id_customer = $3 RETURNING Name, Surname', [name, surname, id]);
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
            //console.log("dd");
            const Seller = await db.query('DELETE From Customer WHERE Name = $1 AND Surname = $2', [Name, Surame]);
            //console.log("sss");
            res.json('Customer delete');
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
}

module.exports = new CustomerController()
