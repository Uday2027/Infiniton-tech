import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { updateServiceCharge, deleteServiceCharge } from "@/lib/db";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const charge = await updateServiceCharge(parseInt(params.id, 10), body);
    if (!charge) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: charge });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update service charge";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ok = await deleteServiceCharge(parseInt(params.id, 10));
  if (!ok) return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  return NextResponse.json({ success: true });
}
