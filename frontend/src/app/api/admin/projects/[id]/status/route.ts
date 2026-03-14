import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/auth";
import { updateProjectStatus } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { status } = await req.json();
  if (!status) return NextResponse.json({ error: "Status is required." }, { status: 400 });

  const updated = await updateProjectStatus(parseInt(params.id), status);
  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });

  revalidatePath("/admin", "layout");
  revalidatePath("/admin/analytics");
  revalidatePath("/admin/projects");
  return NextResponse.json({ success: true, data: updated });
}
