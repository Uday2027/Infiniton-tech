import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { listTransactions, createTransaction } from "@/lib/db";

export async function GET(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const result = await listTransactions({
    type: searchParams.get("type") || undefined,
    category: searchParams.get("category") || undefined,
    project_id: searchParams.get("project_id") ? parseInt(searchParams.get("project_id")!) : undefined,
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
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
    const transaction = await createTransaction(body);
    return NextResponse.json({ success: true, data: transaction });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create transaction";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
