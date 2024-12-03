import { eq } from "drizzle-orm";
import { db } from "../../db";
import { bankAccounts, SelectBankAccount } from "../../schema/other";

export default async function getBankAccountById(id: SelectBankAccount["id"]) {
    const [bankAccount] = await db.select().from(bankAccounts).where(() => eq(bankAccounts.id, id));
    return bankAccount;
}
