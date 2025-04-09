import type { Knex } from "knex";
import { enumStatusTasks } from "../src/commons/enums";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tasks", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    table.string("title").notNullable();
    table.string("description").nullable();
    table.enum("status", Object.values(enumStatusTasks)).defaultTo(enumStatusTasks.OPEN);
    table.date("deadline").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.uuid("userId").references("id").inTable("users").onDelete("CASCADE");
  }
  );
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("tasks");
}

