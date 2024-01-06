/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.uuid('uuid').defaultTo(knex.fn.uuid());
        table.string("username").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.integer("favorite_song_id").unsigned().references("id").inTable("songs").onDelete("SET NULL");
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("users");
};