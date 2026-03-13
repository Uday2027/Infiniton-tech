import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { getTransactionById, updateTransaction, deleteTransaction } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const record = await getTransactionById(parseInt(params.id));
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
  const updated = await updateTransaction(parseInt(params.id), body);
  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });

  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const deleted = await deleteTransaction(parseInt(params.id));
  if (!deleted) return NextResponse.json({ error: "Not found." }, { status: 404 });

  return NextResponse.json({ success: true });
}
