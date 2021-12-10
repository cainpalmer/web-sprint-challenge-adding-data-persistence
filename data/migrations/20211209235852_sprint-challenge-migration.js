
exports.up = async function(knex) {
  await knex.schema
    .createTable('projects', table => {
        table.increments('project_id')
        table.string('project_name', 128).notNullable()
        table.string('project_description', 128)
        table.integer('project_completed').defaultTo(0).unsigned()
    })
    .createTable('resources', table => {
        table.increments('resource_id')
        table.string('resource_name', 128).notNullable().unique()
        table.string('resource_description', 128)
    })
    .createTable('tasks', table => {
        table.increments('tasks_id')
        table.string('tasks_description', 128).notNullable()
        table.string('task_notes')
        table.integer('task_completed').defaultTo(0).unsigned()
        table.integer('project_id').notNullable().unsigned().references('project_id').inTable('projects').onUpdate('RESTRICT').onDelete('RESTRICT')
    })
    .createTable('project_resources', table => {
        table.increments('project_resources_id')
        table.string('resource_assignment', 128)
        table.integer('resource_id').notNullable().unsigned().references('resource_id').inTable('resources').onUpdate('RESTRICT').onDelete('RESTRICT')
    })
};

exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
