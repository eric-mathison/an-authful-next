import { currentUser } from "@/lib/dal"

export async function GET() {
  const user = await currentUser()

  if (!user) {
    return new Response(null, { status: 401 })
  }

  return Response.json({
    status: "success",
  })
}
