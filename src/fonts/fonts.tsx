import { Roboto, Poppins } from "next/font/google"
export const roboto = Roboto({
    weight: ["300", "400", "500", "700", "900"],
    subsets: ['latin']
});

export const poppins = Poppins({
    weight: ["400", "500", "600", "700", "800"],
    subsets: ['latin']
});