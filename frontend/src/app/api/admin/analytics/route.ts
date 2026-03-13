import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { getAnalyticsData } from "@/lib/db";

export async function GET() {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await getAnalyticsData();
  return NextResponse.json(data);
}
