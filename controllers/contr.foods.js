const db = require('../consetting')

class FoodController {

    async createFood(req, res) {
        
        const { name_food, description, price, name_components } = req.body
        const newFood = await db.query('INSERT INTO Food (Name, Description, Price) values ($1, $2, $3) id_food', [name_food, description, price ])
      
        let arr_comps = new Array();
        for(var i in name_components) {
            const id_comp = await db.query('Select id_component From Component WHERE name = $1', [i]);
            
        }
        res.json(newFood.rows[0]).status(200);

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
            const id = req.params.id;
            const Food = await db.query('SELECT Name, Description, Price From Food WHERE id_food = $1', [id]);
            res.json(Food.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
    async updateFood(req, res) {
        try {
            const { id, name_component } = req.body;
            const Food = await db.query('UPDATE Food set Name = $1, Description = $2, Price = $3 WHERE id_food = $4 RETURNING Name', [name_component, id]);
            res.json(Food.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }


    async deleteFood(req, res) {
        try {
            const id = req.params.id;
            const Food = await db.query('DELETE From Component WHERE id_component = $1', [id]);
            res.json('Delete Component with id ' + id);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
}

module.exports = new FoodController()
