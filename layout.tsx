import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { ChatWidget } from "@/components/chat-widget";
export const metadata: Metadata = { title: "H&A Collection | Handmade Bags & Bedsheets", description: "Shop thoughtfully handmade bags and beautiful bedsheets from H&A Collection in Jos, Nigeria." };
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><CartProvider><Header/><main>{children}</main><Footer/><ChatWidget/></CartProvider></body></html>;
}
