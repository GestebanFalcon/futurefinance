"use client"

import createBankAccount from "@/actions/createBankAccount";
import Container from "@/components/form/container";
import Heading from "@/components/form/heading";
import { Dialog } from "@mui/material";
import { useCallback, useState } from "react"
import TextField from "../../form/textField";
import Button from "../../form/button";
import Spinner from "../../util/spinner";
import { SelectBankAccount } from "@/lib/drizzy/schema/other";

/** Component -- Form to handle bank account creation.
 *  Props: handleSuccess - optional function with the resultant bankAccount passed as an input to handle the form's success in any context 
 */
export default function BankAccountForm({ handleSuccess }: { handleSuccess?: (bankAccount: SelectBankAccount) => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<undefined | string>();

    const [data, setData] = useState({
        name: "",
        type: ""
    })

    const handleCreateBankAccount = async () => {
        setIsLoading(true);
        try {
            const { bankAccount, error: err } = await createBankAccount(data);
            console.log(bankAccount);
            console.log(error);
            if (error) { setError(err) };
            if (bankAccount) { handleSuccess && handleSuccess(bankAccount) }
        } catch (err) {
            setError("Something went wrong");
        }
        setIsLoading(false);
    }

    return (
        <Container noMargin>
            <Heading>Add Financial Account</Heading>
            <form>
                <TextField label="Name" value={data.name} onChange={e => { setData({ ...data, name: e.target.value }) }} />
                <TextField label="Type" value={data.type} onChange={e => { setData({ ...data, type: e.target.value }) }} />
                {isLoading ? <Spinner /> : <Button onClick={handleCreateBankAccount}>Create</Button>}
            </form>
            {error && <p>{error}</p>}
        </Container>
    )

}