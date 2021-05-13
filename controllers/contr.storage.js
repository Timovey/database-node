const db = require('../consetting')
const fs = require('fs')
const path = require('path');
const del = require('../madedelete/returndelete')
class StorageController {

    async createStorage(req, res) {
        try {
            //console.log("sdccds");
           // console.log(req.body);
            const { id_food, name_component, amount } = req.body

            const newStorage = await db.query('insert into storage values ($1, (select id_component from component c where name = $2), $3) Returning *', [id_food, name_component, amount ])
            res.json(newStorage.rows[0]).status(200);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async createStorageById(req, res) {
        try {
           // console.log("aaa");
           // console.log(req.body);
            const { id_food, id_component , amount } = req.body

            const newStorage = await db.query('insert into storage values ($1, $2 , $3) Returning *', [id_food, id_component, amount ])
            res.json(newStorage.rows[0]).status(200);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };
    
    async getAllStorages(req, res) {
        try {
            const Storages = await db.query('SELECT * From Storage');
            res.json(Storages.rows);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getStorage(req, res) {
        try {
            const id_food = req.query.id_food;
            const id_component = req.query.id_component;
            //console.log(id_component + " " + id_food);
            const Storage = await db.query('SELECT * From Storage WHERE id_food = $1 AND id_component = $2', [id_food, id_component]);
            
            if(Storage.rows.length == 0) {
                res.json({ "id_food": -1, "id_component": -1 });
                //console.log(Storage.rows.length);
            }
            else {
            res.json(Storage.rows[0]);
            }
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }

    async getFilStorage(req, res) {
        try {
            const id_food = req.query.id_food;
            //console.log(name);
            const Storage = await db.query('SELECT * From Storage WHERE id_food = $1', [id_food]);
            res.json(Storage.rows);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }

    async updateSeller(req, res) {
        try {
            const { id_food,id_component, amount} = req.body;
            //console.log(req.body);
            const Storage = await db.query('UPDATE Storage set amount = $1 WHERE id_food = $2 and id_component = $3 RETURNING *', [id_food, id_component, amount]);
            res.json(Storage.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }

    async deleteStorage(req, res) {
        try {
            const id_food = req.query.id_food;
            const id_component = req.query.id_component;
            //console.log("dd");
            const Storage = await db.query('DELETE From Storage  WHERE id_food = $1 and id_component = $2', [id_food, id_component]);
            //console.log("sss");
            res.json('Storage delete');
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
    async deleteStorageAll(req, res) {
        try {           
            const Storage = await db.query('DELETE From Storage');    
            res.json('All storage delete');
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
}

module.exports = new StorageController ()
