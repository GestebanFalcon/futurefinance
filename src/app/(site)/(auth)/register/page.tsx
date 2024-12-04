import register from "@/actions/register";
import Button from "@/components/form/button";
import Container from "@/components/form/container";
import Heading from "@/components/form/heading";
import TextField from "@/components/form/textField";
import Link from "next/link";

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

    const error = (await searchParams).error;

    return (
        <Container>
            <Heading>Register</Heading>
            <form className="flex gap-4 flex-col items-center" action={register}>
                <TextField label="Name" name="name" type="text" />
                <TextField label="Email" name="email" type="email" />
                <TextField label="Password" name="password" type="password" />
                <Button className="mt-4" type="submit">Register</Button>
                {error === "invalid" && <p>Invalid data</p>}
                {error === "incorrect" && <p>Incorrect email or password</p>}
            </form>
            <p className="text-sm mt-6">Already have an account? <Link href="/login" className="text-neutral-900 font-semibold">Sign In</Link></p>
        </Container>
    )
}