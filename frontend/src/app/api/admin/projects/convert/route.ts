import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { convertConsultationToProject } from "@/lib/db";

export async function POST(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { consultationId } = await req.json();
    if (!consultationId) {
      return NextResponse.json({ error: "consultationId is required." }, { status: 400 });
    }

    const project = await convertConsultationToProject(parseInt(consultationId));
    return NextResponse.json({ success: true, data: project });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to convert";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
