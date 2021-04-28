const db = require('../consetting')

class ComponentController{

    async createComponent(req, res) {
        const{name_component} = req.body 
        const newComponent = await db.query('INSERT INTO Component(name) values ($1) RETURNING *', [name_component])

        res.json(newComponent.rows[0])
    }

    async getAllComponents(req,res) {

        const Components = await db.query('SELECT * From Component')
        res.json(Components.rows)
    }
    async getComponent(req, res) {
        const id = req.params.id;
        const Component = await db.query('SELECT * From Component WHERE id_component = $1', [id])
        res.json(Component.rows[0])
    }
    async updateComponent(req, res) {
        const{id, name_component} = req.body 
        const Component = await db.query('UPDATE Component set Name = $1 WHERE id_component = $2 RETURNING *', [name_component, id])
        res.json(Component.rows[0])
    }


    async deleteComponent(req, res) {
        const id = req.params.id;
        const Component = await db.query('DELETE From Component WHERE id_component = $1', [id])
        res.json('Delete Component with id ' + id);
    }
}

module.exports = new ComponentController()
