import { eq } from "drizzle-orm";
import { db } from "../../db";
import { bankAccounts, SelectBankAccount } from "../../schema/other";

export default async function editBankAccount(id: SelectBankAccount["id"], data: Partial<Omit<SelectBankAccount, "id">>) {
    const updatedBankAccount = await db.update(bankAccounts).set(data).where(eq(bankAccounts.id, id));
    return updatedBankAccount;
}