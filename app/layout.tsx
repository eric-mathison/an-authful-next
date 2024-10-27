import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { getUser } from "@/lib/dal"
import { Navbar } from "@/components/navbar"

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
  const user = await getUser()
  console.log(user)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar user={user} />
        {modals}
        {children}
      </body>
    </html>
  )
}
