import {
    boolean,
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    decimal,
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "next-auth/adapters"

export const users = pgTable('users', {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),

    hashedPassword: text('hashed_password'),

});
export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<any>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)

export const tokens = pgTable("verification_token", {
    email: text("email").notNull()
        .references(() => users.email, { onDelete: "cascade" }),
    token: text("token")
        .$defaultFn(() => crypto.randomUUID()).notNull(),
    expires: timestamp("expires").notNull()
},
    (token) => ({
        compoundKey: primaryKey({
            columns: [token.email, token.token]
        })
    })
)


export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type SelectToken = typeof tokens.$inferSelect;
export type InsertToken = typeof tokens.$inferInsert;