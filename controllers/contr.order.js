const db = require('../consetting')
const fs = require('fs')

const del = require('../madedelete/returndelete')
const path = require('path');
const filePath = path.join(__dirname, '../log/post.txt')

class OrderController {

    async createOrder(req, res) {
        try {
            //console.log("ss");
            const { id_customer, id_seller, totalprice } = req.body
            var t1 = new Date();
            const newOrder = await db.query(`INSERT INTO Orders (id_customer, id_seller, totalprice) values ($1, $2, $3) RETURNING *`, [id_customer, id_seller, totalprice ])
            var t2 = new Date();
            var string = `\nINSERT INTO Orders (id_customer, id_seller, totalprice) values ($1, $2, $3) RETURNING ... TIME: ${t2-t1}`;
            //console.log(string);
            await fs.appendFile(filePath , string, function(err) {
            });
            
            //console.log("ssxd");
            res.json(newOrder.rows[0]).status(200);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getAllOrders(req, res) {
        try {

            var t1 = new Date();
            const Orders = await db.query('SELECT * from v_reportorder');
            var t2 = new Date();
            var string = `\nSELECT * from v_reportorder ... TIME: ${t2-t1}`;
            console.log(string);
            await fs.appendFile(filePath , string, function(err) {
            });
            
            
            res.json(Orders.rows);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getFilterOrders(req, res) {
        try {
            const date = req.query.date;
            var t1 = new Date();
            const Orders = await db.query('SELECT id_order From Orders where date = $1 ', [date]);
            var t2 = new Date();
            var string = `\nSELECT id_order From Orders where date = $1 ... TIME: ${t2-t1}`;
            //console.log(string);
            await fs.appendFile(filePath , string, function(err) {
            });
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
            var t1 = new Date();
            const Order = await db.query('SELECT * From Orders WHERE id_seller = $1 AND id_customer = $2 AND date = $3', [id_seller, id_customer, date]);
            var t2 = new Date();
            var string = `\nSELECT * From Orders WHERE id_seller = $1 AND id_customer = $2 AND date = $3 ... TIME: ${t2-t1}`;
            //console.log(string);
            await fs.appendFile(filePath , string, function(err) {
            });
            res.json(Order.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
    async updateOrder(req, res) {
        try {
            const { id_order, id_seller, id_customer, date } = req.body;
            var t1 = new Date();
            const Order = await db.query('UPDATE Orders set id_seller = $1, id_customer = $2, date = $3 WHERE id_order = $4 RETURNING id_seller, id_customer, date ', [ id_seller, id_customer, date, id_order]);
            var t2 = new Date();
            var string = `\nUPDATE Orders set id_seller = $1, id_customer = $2, date = $3 WHERE id_order = $4 RETURNING id_seller, id_customer, date... TIME: ${t2-t1}`;
            //console.log(string);
            await fs.appendFile(filePath , string, function(err) {
            });
            res.json(Order.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }


    async deleteOrder(req, res) {
        try {
            const id_order = req.query.id_order;
            var t1 = new Date();
            const Order = await db.query('DELETE From orders WHERE id_order = $1', [id_order]);
            const OrderFood = await db.query('DELETE From orderfood WHERE id_order = $1', [id_order]);
            var t2 = new Date();
            var string = `\nDELETE From orders WHERE id_order = $1 and DELETE From orderfood WHERE id_order = $1 ... TIME: ${t2-t1}`;
            //console.log(string);
            await fs.appendFile(filePath , string, function(err) {
            });
           

            del.makeDeleteFile('index');
            res.sendFile(path.join(__dirname, '../views/delete.one.html'));
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
}

module.exports = new OrderController()
