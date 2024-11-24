import { currentRole } from "@/lib/dal"
import { UserRole } from "@prisma/client"

export async function GET() {
  const role = await currentRole()

  if (role !== UserRole.ADMIN) {
    return new Response(null, { status: 401 })
  }

  return Response.json({
    status: "success",
  })
}
