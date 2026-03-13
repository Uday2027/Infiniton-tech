import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { listProjects, createProject } from "@/lib/db";

export async function GET(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const result = await listProjects({
    status: searchParams.get("status") || undefined,
    source: searchParams.get("source") || undefined,
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: parseInt(searchParams.get("limit") || "20", 10),
  });

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const project = await createProject(body);
    return NextResponse.json({ success: true, data: project });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
