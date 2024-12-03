"use server"

import insertUser from "@/lib/drizzy/queries/users/insertUser";
import { registerSchema } from "@/lib/zod";
import bcrypt from "bcrypt";
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

    if (!validatedFields.success) {
        redirect("/register?error=invalid")
    }

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await insertUser({
        email,
        name,
        hashedPassword
    });

    redirect("/login");

    // return { success: "User successfully created", user }
}