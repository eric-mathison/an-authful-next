import { getSession } from "@/lib/session"

export async function GET() {
  const session = await getSession()

  if (!session) {
    return new Response(null, { status: 401 })
  }

  return Response.json({
    session,
  })
}
