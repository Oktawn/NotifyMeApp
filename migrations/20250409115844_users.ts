import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    table.string("email").unique().notNullable();
    table.string("username").notNullable();
    table.string("password").notNullable();
  });

}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}

