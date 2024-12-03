import { eq } from "drizzle-orm";
import { db } from "../../db";
import { bankAccounts } from "../../schema/other";
import { SelectUser } from "../../schema/users";

export default async function getBankAccountsByUserId(id: SelectUser["id"]) {
    const accounts = await db.select().from(bankAccounts).where(() => eq(bankAccounts.userId, id));
    return accounts;

}