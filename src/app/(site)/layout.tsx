import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google"
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-full bg-zinc-100 `}>
        <header>
          <Navbar />
        </header>
        <main className="flex w-full items-center flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
