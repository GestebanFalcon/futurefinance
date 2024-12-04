import handleSignIn from "@/actions/handleSignIn";
import Button from "@/components/form/button";
import Container from "@/components/form/container";
import Heading from "@/components/form/heading";
import TextField from "@/components/form/textField";
import { signIn } from "@/lib/drizzy/auth";
import Link from "next/link";

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

    const error = (await searchParams).error;

    return (
        <Container>
            <Heading>Sign In</Heading>
            <form className="flex flex-col gap-4 items-center" action={handleSignIn}>
                <TextField label="Email" name="email" />
                <TextField label="Password" name="password" type="password" />
                <Button className="mt-4" type="submit">Sign In</Button>
                {error === "invalid" && <p>Invalid data</p>}
                {error === "incorrect" && <p>Incorrect email or password</p>}
            </form>
            <p className="text-sm  mt-6">Don't have an account? <Link href="/register" className="font-semibold text-neutral-900">Register Here</Link></p>
        </Container>
    )
}