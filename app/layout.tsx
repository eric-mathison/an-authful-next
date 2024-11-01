import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description:
    "A project for testing the latest Next.js features and integration with Auth.js",
}

export default async function RootLayout({
  // add parallel routes as props to the highest shared layout
  modals,
  children,
}: Readonly<{
  modals: React.ReactNode
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-white`}
      >
        <Header />
        {modals}
        {children}
        <Footer />
      </body>
    </html>
  )
}
