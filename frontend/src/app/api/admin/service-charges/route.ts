import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { listServiceCharges, createServiceCharge } from "@/lib/db";

export async function GET(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const result = await listServiceCharges({
    projectId: searchParams.get("projectId") ? parseInt(searchParams.get("projectId")!, 10) : undefined,
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: parseInt(searchParams.get("limit") || "10", 10),
  });

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const charge = await createServiceCharge(body);
    return NextResponse.json({ success: true, data: charge });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create service charge";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
