import { currentUser } from "@/lib/dal"

export default async function DashboardPage() {
  const user = await currentUser()
  return (
    <>
      <div className="p-8 sm:p-20">Dashboard</div>
      <p>{JSON.stringify(user)}</p>
    </>
  )
}
