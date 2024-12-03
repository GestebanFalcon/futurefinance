"use server"
import { getTokenByToken } from "@/lib/drizzy/queries/tokens/generateToken"
import getUserByEmail from "@/lib/drizzy/queries/users/getUserByEmail";
import updateUser from "@/lib/drizzy/queries/users/updateUser";


/** Server Action -- Verify the user's email associated with the given token string.
 *  Returns an optionally usable redirect link associated with a given error
 */
export const verifyToken = async (token: string): Promise<{ error?: string, success?: string, redirect?: string }> => {


    const verificationToken = await getTokenByToken(token);

    // If no token with the given token string exists
    if (!verificationToken) {
        return { error: "Invalid token", redirect: "/verify" };
    }


    // If the token is expired
    const currentDate = new Date();
    if (verificationToken.expires < currentDate) {
        return { error: "Expired", redirect: "/verify" };
    }

    const email = verificationToken.email;
    const user = await getUserByEmail(email);


    // if no user referenced by the token (for whatever reason) doesn't exist
    if (!user) {
        return { error: "User does not exist", redirect: "/register" };
    }


    // Verify the user's email on the user entry;
    await updateUser(user?.id, { emailVerified: currentDate });

    return { success: "Email verified" };

}

