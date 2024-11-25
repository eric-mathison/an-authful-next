import React from "react"

export default function DashboardLayout({
  // parallel routes are added as props to the parent layout
  admin,
  authorized,
  children,
}: {
  children: React.ReactNode
  admin: React.ReactNode
  authorized: React.ReactNode
}) {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-8 sm:p-20">
      {children}
      {authorized}
      {admin}
    </main>
  )
}
