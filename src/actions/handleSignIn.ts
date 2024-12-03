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

    if (!validatedFields.success) {
        redirect("/login?error=invalid");
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/"
        });
    } catch (error) {
        console.error(error);
        if (isRedirectError(error)) {
            throw error;
        }
        redirect("/login?error=incorrect");

    }
}
