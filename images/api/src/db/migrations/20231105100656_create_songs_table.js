/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("songs", (table) => {
            table.increments("id").primary();
            table.uuid('uuid').defaultTo(knex.fn.uuid());
            table.string("name").notNullable();
            table
                .integer("artist_id").notNullable()
                .unsigned()
                .references("id")
                .inTable("artists")
                .onDelete("SET NULL");
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("songs", function (table) {
        table.dropForeign("artist_id");
        table.dropColumn("artist_id");
    });
};