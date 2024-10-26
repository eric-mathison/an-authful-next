import { Footer } from "@/components/ui/footer"

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
