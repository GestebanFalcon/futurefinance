"use server"

import { auth } from "@/lib/drizzy/auth";
import updateUser from "@/lib/drizzy/queries/users/updateUser";
import { SelectUser } from "@/lib/drizzy/schema/users";

export default async function editUser(data: Partial<SelectUser>) {
    const session = await auth();
    const id = session?.user?.id;
    if (!id) return { error: "Unauthenticated" };

    const { name } = data;

    const newUser = await updateUser(id, { name });

    if (!newUser) return { error: "Something went wrong" };
    return { newUser: { email: newUser.email, name: newUser.name } };

}