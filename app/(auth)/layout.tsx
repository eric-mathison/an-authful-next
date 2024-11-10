export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid grid-rows-1 justify-center items-center p-8 sm:p-20">
      {children}
    </main>
  )
}
