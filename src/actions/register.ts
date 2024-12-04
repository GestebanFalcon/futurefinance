"use server"

import insertBankAccount from "@/lib/drizzy/queries/bankAccounts/insertBankAccount";
import deleteUser from "@/lib/drizzy/queries/users/deleteUser";
import insertUser from "@/lib/drizzy/queries/users/insertUser";
import { registerSchema } from "@/lib/zod";
import bcrypt from "bcrypt";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

/** Server Action -- creates a new user input, checking for users with existing emails. 
 *  Returns void
 */
export default async function register(formData: FormData) {

    const validatedFields = registerSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name')
    });

    //Reload with error message if the data formatting is incorrect
    if (!validatedFields.success) {
        redirect("/register?error=invalid")
    }

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);


    //Attempt to create the user in the database and create a default bankAccount for the user
    try {
        const user = await insertUser({
            email,
            name,
            hashedPassword
        });

        try {
            const defaultAccount = await insertBankAccount({
                name: "default",
                balance: 0,
                default: true,
                userId: user.id
            });

        } catch (error) {
            //Delete the user if a default account was unable to be created
            //In case of error in default account creation leaving a user created while still returning an error
            await deleteUser(user.id);
        }
    } catch (error) {
        console.error(error);
        if (isRedirectError(error)) {
            throw error;
        }
        redirect("/login?error=unknown");

    }



    redirect("/login");

    // return { success: "User successfully created", user }
}