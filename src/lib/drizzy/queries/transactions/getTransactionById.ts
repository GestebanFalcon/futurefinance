import { eq } from "drizzle-orm";
import { db } from "../../db";
import { SelectTransaction, transactions } from "../../schema/other";

export default async function getTransactionById(id: SelectTransaction["id"]) {
    const transaction = await db.select().from(transactions).where(() => eq(transactions.id, id));
    return transaction;
}