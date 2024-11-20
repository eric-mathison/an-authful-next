import { currentUser } from "@/lib/dal"
import { signOut } from "@/lib/auth"

export default async function DashboardPage() {
  const user = await currentUser()
  return (
    <>
      <div className="p-8 sm:p-20">Dashboard</div>
      <p>{JSON.stringify(user)}</p>
      <form
        action={async () => {
          "use server"
          await signOut({
            redirectTo: "/login",
            redirect: true,
          })
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </>
  )
}
