const db = require('../consetting')

class ComponentController {

    async createComponent(req, res) {
        const { name_component } = req.body
        const newComponent = await db.query('INSERT INTO Component(name) values ($1) RETURNING Name', [name_component])
        res.json(newComponent.rows[0])

    };

    async getAllComponents(req, res) {
        try {
            const Components = await db.query('SELECT Name From Component');
            res.json(Components.rows);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    };


    async getComponent(req, res) {
        try {
            const id = req.params.id;
            const Component = await db.query('SELECT Name From Component WHERE id_component = $1', [id]);
            res.json(Component.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }
    async updateComponent(req, res) {
        try {
            const { id, name_component } = req.body;
            const Component = await db.query('UPDATE Component set Name = $1 WHERE id_component = $2 RETURNING Name', [name_component, id]);
            res.json(Component.rows[0]);
        }
        catch (ex) {
            console.log(ex.massage);
        }
    }


    async deleteComponent(req, res) {
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

module.exports = new ComponentController()
