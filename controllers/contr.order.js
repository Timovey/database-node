const db = require('../consetting')
const fs = require('fs')
const del = require('../madedelete/returndelete')
const path = require('path');
class OrderController {

    async createOrder(req, res) {
        try {
            //console.log("ss");
            const { id_customer, id_seller, totalprice } = req.body

            const newOrder = await db.query(`INSERT INTO Orders (id_customer, id_seller, totalprice) values ($1, $2, $3) RETURNING *`, [id_customer, id_seller, totalprice ])
            //console.log("ssxd");
            res.json(newOrder.rows[0]).status(200);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getAllOrders(req, res) {
        try {
            //console.log("sdcsdcsdc")
            const Orders = await db.query('SELECT * from v_reportorder');
            res.json(Orders.rows);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getFilterOrders(req, res) {
        try {
            const date = req.query.date;
            const Orders = await db.query('SELECT id_order From Orders where date = $1 ', [date]);
            res.json(Orders.rows);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getOrder(req, res) {
        try {
            const id_seller = req.query.id_seller;
            const id_customer = req.query.id_customer;
            const date = req.query.date;
            //console.log(name);
            const Order = await db.query('SELECT * From Orders WHERE id_seller = $1 AND id_customer = $2 AND date = $3', [id_seller, id_customer, date]);
            res.json(Order.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
    async updateOrder(req, res) {
        try {
            const { id_order, id_seller, id_customer, date } = req.body;
            //console.log(req.body);
            const Order = await db.query('UPDATE Orders set id_seller = $1, id_customer = $2, date = $3 WHERE id_order = $4 RETURNING id_seller, id_customer, date ', [ id_seller, id_customer, date, id_order]);
            res.json(Order.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }


    async deleteOrder(req, res) {
        try {
            const id_order = req.query.id_order;
            const Order = await db.query('DELETE From orders WHERE id_order = $1', [id_order]);
            const OrderFood = await db.query('DELETE From orderfood WHERE id_order = $1', [id_order]);
            del.makeDeleteFile('index');
            res.sendFile(path.join(__dirname, '../views/delete.one.html'));
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
}

module.exports = new OrderController()
