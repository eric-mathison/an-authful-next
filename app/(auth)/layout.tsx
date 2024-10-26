import { Footer } from "@/components/ui/footer"

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-[radial-gradient(farthest-corner_at_40px_40px,_var(--tw-gradient-stops))] from-green-400 to-emerald-500">
      {children}
      <Footer transparent />
    </div>
  )
}
