import Image from "next/image";
import "./page.css"
import Button from "@/components/form/button";
import futureFinanceLogoBig from "./FutureFinanceLogoBigPNG.png"
import Link from "next/link";

export default (function Page() {
  return (
    <div className=" flex-grow flex flex-row justify-start w-full bg-gradient-to-br from-zinc-500 to-zinc-100">
      <div className=" bg-neutral-50 shadow-lg w-7/12 py-32 px-64 flex justify-center">
        <section className=" flex flex-col justify-start items-start gap-4">
          <h1 className="font-bold text-2xl">The Solution to All of Your Financial Needs</h1>
          <p className="text-lg">FutureFinance makes it easy to log and understand your spending, keeping your money smart and keeping your habits secure</p>
          <Link href="/app/dashboard"><Button className="mt-2 text-xl">Use Now</Button></Link>
        </section>
      </div>
      <div className="flex-grow flex justify-center items-center ">
        <Image src={futureFinanceLogoBig} height={640} alt="Logo"></Image>
      </div>
    </div>
  );
})
