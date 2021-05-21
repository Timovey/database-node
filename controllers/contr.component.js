const db = require('../consetting')
const fs = require('fs')
const path = require('path');
const filePath = path.join(__dirname, '../log/post.txt')
const del = require('../madedelete/returndelete')

class ComponentController {

    async createComponent(req, res) {
        try {
            const { name_component } = req.body
            var t1 = new Date();
            const newComponent = await db.query('INSERT INTO Component (Name) values ($1) RETURNING Name', [name_component])
            var t2 = new Date();
            var string = `\nINSERT INTO Component (Name) values ($1) RETURNING Name... TIME: ${t2-t1}`;
            //console.log(string);
            await fs.appendFile(filePath , string, function(err) {
            });
           
            res.json(newComponent.rows[0]).status(200);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };

    async getAllComponents(req, res) {
        try {
            var t1 = new Date();
            const Components = await db.query('SELECT * From Component');
            var t2 = new Date();
            var string = `\nSELECT * From Component ... TIME: ${t2-t1}`;
            //console.log(string);
            await fs.appendFile(filePath , string, function(err) {
            });
                        res.json(Components.rows);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };


    async getComponent(req, res) {
        try {
            const name = req.query.name_component;
            var t1 = new Date();
            const Component = await db.query('SELECT id_component From Component WHERE Name = $1', [name]);
            var t2 = new Date();
            var string = `\nSELECT id_component From Component WHERE Name ... TIME: ${t2-t1}`;
            //console.log(string);
            await fs.appendFile(filePath , string, function(err) {
            });
            res.json(Component.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
    async updateComponent(req, res) {
        try {
            const { id, name_component } = req.body;
            var t1 = new Date();
            const Component = await db.query('UPDATE Component set Name = $1 WHERE id_component = $2 RETURNING Name', [name_component, id]);
            var t2 = new Date();
            var string = `\nUPDATE Component set Name = $1 WHERE id_component = $2 RETURNING Name ... TIME: ${t2-t1}`;
            //console.log(string);
            await fs.appendFile(filePath , string, function(err) {
            });
            
            res.json(Component.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }


    async deleteComponent(req, res) {
        try {
            const name = req.query.name_component;
            //console.log(name);
            var t1 = new Date();
            const Component = await db.query('DELETE From Component WHERE Name = $1', [name]);
            var t2 = new Date();
            var string = `\nDELETE From Component WHERE Name = $1... TIME: ${t2-t1}`;
            fs.appendFileSync(filePath , string, function(err) {
            });
            
            del.makeDeleteFile('component');
            res.sendFile(path.join(__dirname, '../views/delete.one.html'));
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
}

module.exports = new ComponentController()
