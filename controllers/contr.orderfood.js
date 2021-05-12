const db = require('../consetting')

class OrderFoodController {

    async createOrderFood(req, res) {
        try {
            //console.log("ss");
            const { id_order, id_food, amount } = req.body

            const newOrderFood = await db.query(`INSERT INTO OrderFood (id_order, id_food, amount) values ($1, $2, $3) RETURNING *`, [id_order, id_food, amount])
            //console.log("ssxd");
            res.json(newOrderFood.rows[0]).status(200);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getAllOrderFoods(req, res) {
        try {
            const OrderFoods = await db.query('SELECT * From OrderFood');
            res.json(OrderFoods.rows);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };


    async getOrderFood(req, res) {
        try {
            const id_order = req.query.id_order;
            const id_food = req.query.id_food;
            //console.log(name);
            const OrderFood = await db.query('SELECT * From OrderFood WHERE id_order = $1 AND id_food = $2', [id_order, id_food]);
            res.json(OrderFood.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }

    async deleteOrderFood(req, res) {
        try {
            const id_order = req.query.id_order;
            const id_food = req.query.id_food;
            const OrderFood = await db.query('DELETE From OrderFood WHERE id_order = $1 AND id_food = $2', [id_order, id_food]);
            res.json('OrderFood delete');
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
}

module.exports = new OrderFoodController()
