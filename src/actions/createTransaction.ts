"use server"
import { auth } from "@/lib/drizzy/auth";
import getBankAccountById from "@/lib/drizzy/queries/bankAccounts/getBankAccountById";
import insertTransaction from "@/lib/drizzy/queries/transactions/insertTransaction";
import { InsertTransaction } from "@/lib/drizzy/schema/other";



export default async function createTransaction(data: InsertTransaction) {

    //Verify bank account exists
    const bankAccount = await getBankAccountById(data.bankAccountId);
    if (!bankAccount) {
        return { error: "Bank account does not exist" }
    }

    //Verify the user is signed in as the bank account's owner
    const session = await auth();
    if (!(session?.user?.id === bankAccount.userId)) {
        return { error: "Unauthorized" }
    }

    const transaction = await insertTransaction(data);
    return { transaction };

}   