const db = require('../consetting')

class SellerController {

    async createSeller(req, res) {
        try {
            const { name, surname, salary } = req.body
            const newSeller = await db.query('INSERT INTO Seller (Name, Surname, Salary) values ($1, $2, $3) RETURNING Name, Surname', [name, surname, salary])
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
            const { name, surname, salary } = req.body
            const Seller = await db.query('SELECT seller_id From Seller WHERE Name = $1 AND Surname = $2 AND Salary = $3', [name, surname, salary]);
            res.json(Seller.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
    async updateSeller(req, res) {
        try {
            const { name, surname, salary } = req.body;
            const Seller = await db.query('UPDATE Component set Name = $1 WHERE id_component = $2 RETURNING Name', [name_component, id]);
            res.json(Component.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }


    async deleteSeller(req, res) {
        try {
            const id = req.params.id;
            const Component = await db.query('DELETE From Component WHERE id_component = $1', [id]);
            res.json('Delete Component with id ' + id);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
}

module.exports = new SellerController()
