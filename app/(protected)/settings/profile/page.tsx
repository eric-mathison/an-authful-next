import { signOut } from "@/lib/auth"

export default function UserProfilePage() {
  return (
    <div className="p-8 sm:p-20">
      Profile
      <form
        className=""
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/login" })
        }}
      >
        <button type="submit">Signout</button>
      </form>
    </div>
  )
}
