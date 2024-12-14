"use server"

import { auth } from "@/lib/drizzy/auth";
import { db } from "@/lib/drizzy/db";
import getBankAccountsByUserId from "@/lib/drizzy/queries/bankAccounts/getBankAccountsByUserId";
import getTransactionsByBankAccountId from "@/lib/drizzy/queries/transactions/getTransactionsByBankAccountId";
import { SelectBankAccount, SelectTransaction, transactions } from "@/lib/drizzy/schema/other";
import { eq } from "drizzle-orm";

export default async function deleteTransactions(deletedTransactions: SelectTransaction[], bankAccountId: SelectBankAccount["id"]) {

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "Unauthenticated" }
    }
    const bankAccounts = await getBankAccountsByUserId(userId);
    const bankAccountIds = bankAccounts.map(account => account.id);

    for (const transaction of deletedTransactions) {
        if (!bankAccountIds.includes(transaction.bankAccountId)) {
            return { error: "Unauthorized" };
        }
    }

    for (const transaction of deletedTransactions) {
        await db.delete(transactions).where(eq(transactions.id, transaction.id));
    }

    const newTransactions = await getTransactionsByBankAccountId(bankAccountId);

    return { transactions: newTransactions };

}