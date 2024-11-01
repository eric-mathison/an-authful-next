import { getSession } from "@/lib/session"
import { signOut } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await getSession()
  return (
    <>
      <div className="p-8 sm:p-20">Dashboard</div>
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </>
  )
}
