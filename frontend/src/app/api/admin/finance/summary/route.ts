import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { getFinanceSummary } from "@/lib/db";

export async function GET(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const summary = await getFinanceSummary({
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
  });

  return NextResponse.json(summary);
}
