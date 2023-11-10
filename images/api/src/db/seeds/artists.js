/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('artists').del()
  await knex('artists').insert([{
      id: 1,
      name: 'Shree Kaul'
    },
    {
      id: 2,
      ame: 'Laufey'
    },
    {
      id: 3,
      name: 'Beabadoobee'
    }
  ]);
};