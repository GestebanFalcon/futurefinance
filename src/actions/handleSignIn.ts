"use server"
import { signIn } from "@/lib/drizzy/auth";
import { signInSchema } from "@/lib/zod";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export default async function handleSignIn(formData: FormData) {
    const validatedFields = signInSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    //Reload with an error message if the data formatting is incorrect
    if (!validatedFields.success) {
        redirect("/login?error=invalid");
    }

    const { email, password } = validatedFields.data;

    //Attempt to sign in and reload with an error message if the results are incorrect
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/app/settings"
        });
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        redirect("/login?error=incorrect");

    }
}
