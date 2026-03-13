import { NextResponse } from "next/server";
import { createAdminUser } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function GET() {
  try {
    const hash = await hashPassword("admin123");
    const user = await createAdminUser("admin", hash);

    return NextResponse.json({
      success: true,
      message: "Admin user created. Now delete this route!",
      user: { id: user.id, username: user.username },
    });
  } catch (error: unknown) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
