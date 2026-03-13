import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { getProjectById, updateProject, deleteProject } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const record = await getProjectById(parseInt(params.id));
  if (!record) return NextResponse.json({ error: "Not found." }, { status: 404 });

  return NextResponse.json({ data: record });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const updated = await updateProject(parseInt(params.id), body);
  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });

  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const deleted = await deleteProject(parseInt(params.id));
  if (!deleted) return NextResponse.json({ error: "Not found." }, { status: 404 });

  return NextResponse.json({ success: true });
}
