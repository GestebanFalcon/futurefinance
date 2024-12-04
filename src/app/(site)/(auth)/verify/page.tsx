"use client"
import createNewToken from "@/actions/createNewToken";
import Button from "@/components/form/button";
import Container from "@/components/form/container";
import Heading from "@/components/form/heading";
import Skeleton from "@/components/util/skeleton";
import Spinner from "@/components/util/spinner";
import { useCallback, useState } from "react";

export default function Page() {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [redirect, setRedirect] = useState<string | undefined>();
    const [sent, setSent] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    /** Action to call createnewtoken and update teh state according to the response. Will update loading state, potentially error and success states */
    const handleCreateToken = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await createNewToken()
            if (res.error) { setError(res.error) };
            if (res.success) { setSuccess(res.success) };

        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
        setSent(true);
        setIsLoading(false);

    }, []);


    return (
        <Container>
            <Heading>Verify Email</Heading>
            {isLoading ? <Spinner /> : (
                <>
                    {!success && !error && (<Button className="bg-emerald-500 hover:bg-yellow-700" isCaps onClick={handleCreateToken}>Send Verification Email</Button>)}

                    {success && (
                        <>
                            <p>{success}</p>
                            <Button className="bg-lime-500 hover:bg-lime-700 mt-4" isCaps>Send Again?</Button>
                        </>
                    )}

                    {error && (
                        <>
                            <p>{error}</p>
                            <Button className="bg-red-500 hover:bg-red-700 mt-4" isCaps>Try Again?</Button>
                        </>
                    )}
                </>
            )}



        </Container>
    )
}