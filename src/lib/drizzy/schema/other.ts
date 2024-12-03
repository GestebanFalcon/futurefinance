import { pgTable, text, decimal, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const bankAccounts = pgTable('bank_account', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    balance: decimal('balance'),
    userId: text('user_id')
        .references(() => users.id)
        .notNull()
});

export const transactions = pgTable("transaction", {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    location: text('location'),
    category: text('category'),
    bankAccountId: text('bank_account_id')
        .references(() => bankAccounts.id)
        .notNull(),
    date: timestamp('date')

})


export type SelectBankAccount = typeof bankAccounts.$inferSelect;
export type InsertBankAccount = typeof bankAccounts.$inferInsert;

export type SelectTransaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;