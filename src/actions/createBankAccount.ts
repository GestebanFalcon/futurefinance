"use server"
import { auth } from "@/lib/drizzy/auth"
import insertBankAccount from "@/lib/drizzy/queries/bankAccounts/insertBankAccount";
import { bankAccounts } from "@/lib/drizzy/schema/other";
import { createBankAccountSchema } from "@/lib/zod";
import { redirect } from "next/navigation";
import { userAgent } from "next/server";

/** Server Action -- Creates a new bank account for the signed in user with a given name*/
export default async function createBankAccount({ name, type }: { name: string, type: string }) {
    //Check data format
    const validatedFields = createBankAccountSchema.safeParse({
        name,
        type
    })
    //Return error if incorrect
    if (!validatedFields.success) { return { error: "Invalid format" } }

    //Get user from session
    const session = await auth();

    //Redirect user to login if not signed in
    if (!session?.user) {
        redirect("/login");
    }
    //Create the new bank account
    const bankAccount = await insertBankAccount({ name, userId: session.user.id, balance: 0, type, default: false });

    //Return the new bank account
    return { bankAccount };

}