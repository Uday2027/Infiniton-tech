import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { getMonthlyFinanceData } from "@/lib/db";

export async function GET(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString(), 10);
  const data = await getMonthlyFinanceData(year);

  return NextResponse.json(data);
}
