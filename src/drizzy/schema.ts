import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username'),
    hashedPassword: text('hashed_password'),

});

// export const  = pgTable('account', {

// });