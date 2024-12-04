import { eq } from "drizzle-orm";
import { db } from "../../db";
import { SelectUser, users } from "../../schema/users";

export default async function deleteUser(id: SelectUser["id"]) {
    const [deletedId] = await db.delete(users).where(eq(users.id, id)).returning({ id: users.id });
    return deletedId;
}