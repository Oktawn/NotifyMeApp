import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("refresh_tokens", (table) => {
    table.string("token").primary().notNullable();
    table.timestamp("expires_at").notNullable();
    table.uuid("userId").references("id").inTable("users").onDelete("CASCADE");
  }
  );
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("refresh_tokens");

}

