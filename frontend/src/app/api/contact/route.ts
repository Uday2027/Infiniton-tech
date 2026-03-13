import { NextRequest, NextResponse } from "next/server";
import { createContactMessage } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const contact = await createContactMessage({ name, email, subject, message });

    return NextResponse.json({ success: true, id: contact.id });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit contact message." },
      { status: 500 }
    );
  }
}
