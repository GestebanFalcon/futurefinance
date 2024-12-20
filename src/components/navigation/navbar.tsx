import Link from "next/link";
import ProfileButton from "./profileButton";
import { auth } from "@/lib/drizzy/auth";
import Image from "next/image";

export default async function Navbar() {

    const session = await auth();

    return (
        <nav className=" w-full h-16 bg-zinc-50 shadow-md flex relative z-20">
            <section className=" text-xl ml-8 font-semibold flex items-center"><Link href="/"><Image src="/FutureFinanceLogoPng.png" alt="Home" width={64} height={64} /></Link></section>
            <section className=" ml-auto mr-8 flex items-center content-center">{session ? <ProfileButton session={session} /> : (
                <>
                    <Link className=" bg-zinc-50 text-emerald-400 hover:bg-emerald-50 transition-colors hover:border-emerald-500 hover:text-emerald-500 py-2 px-4 rounded-md font-medium text-lg border-emerald-400 border-2" href="/login">Sign In</Link>
                    <Link className=" ml-2 bg-emerald-400 text-white py-2 px-4 rounded-md font-medium text-lg transition-colors hover:bg-emerald-600 hover:border-emerald-600 hover:text-zinc-50 border-emerald-400 border-2" href="/register">Register</Link>
                </>
            )}</section>
        </nav>
    )
}