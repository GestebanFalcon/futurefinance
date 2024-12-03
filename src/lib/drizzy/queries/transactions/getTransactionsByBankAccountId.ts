import { eq } from "drizzle-orm";
import { db } from "../../db";
import { SelectBankAccount, transactions } from "../../schema/other";

export default async function getTransactionsByBankAccountId(id: SelectBankAccount["id"]) {
    const transactionList = await db.select().from(transactions).where(() => eq(transactions.bankAccountId, id));
    return transactionList;
}