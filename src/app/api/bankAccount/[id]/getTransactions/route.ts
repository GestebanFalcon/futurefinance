import { auth } from "@/lib/drizzy/auth";
import getBankAccountById from "@/lib/drizzy/queries/bankAccounts/getBankAccountById";
import getTransactionById from "@/lib/drizzy/queries/transactions/getTransactionById";
import getTransactionsByBankAccountId from "@/lib/drizzy/queries/transactions/getTransactionsByBankAccountId";
import { getTransactionsSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const verifiedSchema = getTransactionsSchema.safeParse({ id });

    if (!verifiedSchema.success) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const bankAccount = await getBankAccountById(id);

    if (!bankAccount) {
        return NextResponse.json({ error: "Account does not exist" }, { status: 404 });
    }

    const session = await auth();

    if (!(session?.user?.id === bankAccount.userId)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const transactions = await getTransactionsByBankAccountId(id);

    return NextResponse.json({ transactions });

}