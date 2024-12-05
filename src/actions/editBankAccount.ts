"use server"
import { auth } from "@/lib/drizzy/auth";
import getBankAccountById from "@/lib/drizzy/queries/bankAccounts/getBankAccountById";
import updateBankAccount from "@/lib/drizzy/queries/bankAccounts/updateBankAccount";
import { SelectBankAccount } from "@/lib/drizzy/schema/other";
import { SelectUser } from "@/lib/drizzy/schema/users";
import { editBankAccountSchema } from "@/lib/zod";

/** Server Action -- Edits the user's bankAccount, updating only the name and type.
 *  Returns an object with either the new bankAccount or an error as properties
 */
export default async function editBankAccount({ name, type, id }: { name: SelectBankAccount["name"], type: SelectBankAccount["type"], id: SelectBankAccount["id"] }) {
    const session = await auth();

    //Validate data format
    const validatedFields = editBankAccountSchema.safeParse({ name, type });
    if (!validatedFields.success) {
        return { error: "Invalid data format" }
    }

    //Find and check if the specified bank account exists
    const bankAccount = await getBankAccountById(id);
    if (!bankAccount) {
        return { error: "Bank account does not exist" }
    }

    //Check if the user is authorized as the owner of this account
    if (!(session?.user?.id === bankAccount.userId)) {
        return { error: "Unauthorized" }
    }



    //Update and return the new bank account
    const newBankAccount = await updateBankAccount(id, { name, type });
    return { newBankAccount };
}