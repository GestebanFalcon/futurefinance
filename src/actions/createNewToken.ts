"use server"

import { auth } from "@/lib/drizzy/auth"
import generateToken from "@/lib/drizzy/queries/tokens/generateToken";
import { sendVerifyEmail } from "@/lib/resend";
import { redirect } from "next/navigation";

/** Action to be used to both create new email verification token and send the user a new verification email in order to verify their account */
export default async function createNewToken(): Promise<{ error?: string, success?: string }> {

    const session = await auth();
    if (!session?.user?.email) {
        redirect("/auth/login");
    }

    const token = await generateToken(session.user.email);
    const { error } = await sendVerifyEmail({ to: token.email, token: token.token });

    if (!error) {
        return { success: "Email successfully sent" };
    }

    if (typeof error === "string") {
        return { error }
    }
    return { error: error.message };

}