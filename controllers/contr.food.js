const db = require('../consetting')

class FoodController {

    async createFood(req, res) {
        try {
            console.log("ss");
            const { name, description, price } = req.body

            const newFood = await db.query(`INSERT INTO Food (Name, Description, Price) values ($1, $2, $3) RETURNING *`, [name, description, price])
            console.log("ssxd");
            res.json(newFood.rows[0]).status(200);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getAllFoods(req, res) {
        try {
            const Foods = await db.query('SELECT Name, Description, Price From Food');
            res.json(Foods.rows);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };


    async getFood(req, res) {
        try {
            const name = req.query.name;
            //console.log(name);
            const Food = await db.query('SELECT id_food From Food WHERE Name = $1', [name]);
            res.json(Food.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
    async updateFood(req, res) {
        try {
            const { id, name, description, price } = req.body;
            //console.log(req.body);
            const Food = await db.query('UPDATE Food set Name = $1, Description = $2, Price = $3 WHERE id_food = $4 RETURNING Name, Description, Price', [name, description, price, id]);
            res.json(Food.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }


    async deleteFood(req, res) {
        try {
            const name = req.query.name;
            const Food = await db.query('DELETE From Food WHERE Name = $1', [Name]);
            res.json('Food delete');
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
}

module.exports = new FoodController()
