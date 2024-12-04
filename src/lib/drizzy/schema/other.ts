import { pgTable, text, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

export const bankAccounts = pgTable('bank_account', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    type: text('type'),
    balance: decimal('balance')
        .$type<number>()
        .notNull(),
    userId: text('user_id')
        .references(() => users.id)
        .notNull(),
    default: boolean('default')
        .notNull(),
});

export const transactions = pgTable("transaction", {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    location: text('location'),
    category: text('category')
        .notNull(),
    bankAccountId: text('bank_account_id')
        .references(() => bankAccounts.id)
        .notNull(),
    date: timestamp('date')
        .notNull(),

    value: decimal('value')
        .$type<number>()
        .notNull()
})


export type SelectBankAccount = typeof bankAccounts.$inferSelect;
export type InsertBankAccount = typeof bankAccounts.$inferInsert;

export type SelectTransaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;