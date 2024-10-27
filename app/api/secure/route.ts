import { verifySession } from "@/lib/dal"

export async function GET() {
  const session = await verifySession()

  if (!session) {
    return new Response(null, { status: 401 })
  }

  return Response.json({
    session,
  })
}
