import Link from "next/link";
import ProfileButton from "./profileButton";
import { auth } from "@/lib/drizzy/auth";

export default async function Navbar() {

    const session = await auth();
    console.log(session);

    return (
        <nav className=" w-full h-16 bg-zinc-50 shadow-md flex">
            <section className=" text-lg ml-16 font-semibold flex items-center"><Link href="/">Home</Link></section>
            <section className=" ml-auto mr-16 flex items-center content-center">{session ? <ProfileButton session={session} /> : (
                <Link className=" bg-emerald-600 text-zinc-50 py-2 px-4 rounded-md font-medium text-lg hover:bg-emerald-400 hover:text-white" href="/register">Register</Link>
            )}</section>
        </nav>
    )
}