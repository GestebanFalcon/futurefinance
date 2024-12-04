"use client"
import { verifyToken } from "@/actions/verifyToken";
import Container from "@/components/form/container";
import Heading from "@/components/form/heading";
import Spinner from "@/components/util/spinner";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page() {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [redirect, setRedirect] = useState<string | undefined>();
    const [sent, setSent] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const params = useParams<{ token: string }>();

    const token = params.token;

    if (!token) { router.push("/verify") }

    /** Call the verifyToken action and handle errors/redirect/state change accordingly */
    const handleVerify = useCallback(async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const res = await verifyToken(token);
            if (res.error) {
                setError(res.error);
            }
            if (res.success) {
                setSuccess(res.success + ": redirecting...");
                setTimeout(() => {
                    router.push("/user/dashboard");
                }, 1000)
            }
            if (res.redirect) {
                setRedirect(res.redirect);
            }

        } catch (err) {
            setError("Something went wrong");
            setRedirect("/auth/verify");
        }
        setIsLoading(false);
    }, []);

    // Call the verify handler on initial state load if a token is passed
    useEffect(() => {
        handleVerify();
    }, [])

    return (
        <Container>
            <Heading>Verify Email</Heading>
            {isLoading ? <Spinner /> : (
                <>
                    {success && <p>{success}</p>}
                    {error && !redirect && <p>{error}</p>}
                    {error && redirect && <Link href={redirect}>{error}</Link>}
                </>
            )}
        </Container>
    )
}