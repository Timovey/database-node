const db = require('../consetting')
const fs = require('fs')
const path = require('path');
const filePath = path.join(__dirname, '../log/post.txt')
const del = require('../madedelete/returndelete')
class SellerController {

    async createSeller(req, res) {
        try {
            //console.log("sdccds");
            const { name, surname, salary} = req.body
            var t1 = new Date();
            const newSeller = await db.query('INSERT INTO Seller (Name, Surname, Salary) values ($1, $2, $3) RETURNING Name, Surname, Salary', [name, surname, salary])
            var t2 = new Date();
            var string = `\nINSERT INTO Seller (Name, Surname, Salary) values ($1, $2, $3) RETURNING Name, Surname, Salary... TIME: ${t2-t1}`;
            await fs.appendFile(filePath , string, function(err) {
            });
            

            res.json(newSeller.rows[0]).status(200);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getAllSellers(req, res) {
        try {
            var t1 = new Date();
            const Sellers = await db.query('SELECT * From Seller');
            var t2 = new Date();
            var string = `\nSELECT * From Seller... TIME: ${t2-t1}`;
            await fs.appendFile(filePath , string, function(err) {
            });
           
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
            var t1 = new Date();
            const Seller = await db.query('SELECT id_seller From Seller WHERE Name = $1 AND Surname = $2', [Name, Surame]);
            var t2 = new Date();
            var string = `\nSELECT id_seller From Seller WHERE Name = $1 AND Surname = $2.. TIME: ${t2-t1}`;
            await fs.appendFile(filePath , string, function(err) {
            });
           
            res.json(Seller.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
    async updateSeller(req, res) {
        try {
            const { id, name, surname, salary} = req.body;
            var t1 = new Date();
            const Seller = await db.query('UPDATE Seller set Name = $1, Surname = $2, Salary = $3 WHERE id_seller = $4 RETURNING Name, Surname, Salary', [name, surname, salary, id]);
            var t2 = new Date();
            var string = `\nUPDATE Seller set Name = $1, Surname = $2, Salary = $3 WHERE id_seller = $4 RETURNING Name, Surname, Salary.. TIME: ${t2-t1}`;
            await fs.appendFile(filePath , string, function(err) {
            });
            
           
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
            var t1 = new Date();
            const Seller = await db.query('DELETE From Seller WHERE Name = $1 AND Surname = $2', [Name, Surame])
            var t2 = new Date();
            var string = `\n'DELETE From Seller WHERE Name = $1 AND Surname = $2 ... TIME: ${t2-t1}`;
            await fs.appendFile(filePath , string, function(err) {
            });
            
            //console.log("ddd324");
            del.makeDeleteFile('seller');
            console.log("ddd");
            res.sendFile(path.join(__dirname, '../views/delete.one.html'));
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
}

module.exports = new SellerController()
