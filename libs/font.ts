import { Inria_Serif, Italianno} from "next/font/google";

export const inriaSerif = Inria_Serif({
  variable: "--font-inria-serif",
  subsets: ["latin-ext"],
  weight: ["700"],
});
export const italianno =Italianno({
  variable:"--font-italianno-serif",
  subsets: ["latin"],
  weight:["400"]
})