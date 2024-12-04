import { bankAccounts, InsertBankAccount } from "@/lib/drizzy/schema/other";
import { db } from "../../db";

export default async function insertBankAccount(data: InsertBankAccount) {
    const [bankAccount] = await db.insert(bankAccounts).values(data).returning();
    return { ...bankAccount, balance: bankAccount.balance };
}