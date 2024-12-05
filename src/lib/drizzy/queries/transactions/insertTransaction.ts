import { db } from "../../db";
import { InsertTransaction, transactions } from "../../schema/other";

export default async function insertTransaction(data: InsertTransaction) {
    const [transaction] = await db.insert(transactions).values(data).returning();
    return transaction;
}