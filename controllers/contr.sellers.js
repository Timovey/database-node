const db = require('../consetting')

class SellerController {

    async createSeller(req, res) {
        try {
            console.log("sdccds");
            const { name, surname, salary} = req.body
            const newSeller = await db.query('INSERT INTO Seller (Name, Surname, Salary) values ($1, $2, $3) RETURNING Name, Surname, Salary', [name, surname, salary])
            res.json(newSeller.rows[0]).status(200);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getAllSellers(req, res) {
        try {
            const Sellers = await db.query('SELECT Name, Surname, Salary From Seller');
            res.json(Sellers.rows);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };


    async getSeller(req, res) {
        try {
            const Name = req.query.name;
            const Surame = req.query.surname;
            //console.log(name);
            const Seller = await db.query('SELECT id_seller From Seller WHERE Name = $1 AND Surname = $2', [Name, Surame]);
            res.json(Seller.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
    async updateSeller(req, res) {
        try {
            const { id, name, surname, salary} = req.body;
            //console.log(req.body);
            const Seller = await db.query('UPDATE Seller set Name = $1, Surname = $2, Salary = $3 WHERE id_seller = $4 RETURNING Name, Surname, Salary', [name, surname, salary, id]);
            res.json(Seller.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }


    async deleteSeller(req, res) {
        try {
            const Name = req.query.name;
            const Surame = req.query.surname;
            console.log("dd");
            const Seller = await db.query('DELETE From Seller WHERE Name = $1 AND Surname = $2', [Name, Surame]);
            console.log("sss");
            res.json('Seller delete');
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
}

module.exports = new SellerController()
