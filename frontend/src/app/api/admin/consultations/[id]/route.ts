import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { getConsultationById } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const record = await getConsultationById(parseInt(params.id));
  if (!record) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ data: record });
}
