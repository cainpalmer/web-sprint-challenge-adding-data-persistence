
// Imports
const db = require('../../data/dbConfig')

// Actions
const getAll = () => {
    return db('resources')
}
const create = async (resource) => {
    const [id] = await db('resources').insert(resource)
    return db('resources').where('resource_id', id).first()
}

// Exports
module.exports = {
    getAll,
    create
}