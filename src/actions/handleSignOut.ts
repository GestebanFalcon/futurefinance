"use server"
import { signOut } from "@/lib/drizzy/auth";

/** Server Action -- Wrapper for AuthJS 5.0 signout function */
export default async function handleSignOut() {
    await signOut()
}