import { NextRequest, NextResponse } from "next/server";
import { createConsultation } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, projectType, projectDescription, keyFeatures, budget, timeline } = body;

    if (!name || !email || !projectType || !projectDescription || !keyFeatures || !budget || !timeline) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const consultation = await createConsultation({
      name,
      email,
      company: body.company || undefined,
      phone: body.phone || undefined,
      projectType,
      projectName: body.projectName || undefined,
      projectDescription,
      targetAudience: body.targetAudience || undefined,
      keyFeatures,
      existingSolution: body.existingSolution || undefined,
      budget,
      timeline,
      teamSize: body.teamSize || undefined,
      additionalNotes: body.additionalNotes || undefined,
      aiSuggestion: body.aiSuggestion || undefined,
    });

    return NextResponse.json({ success: true, id: consultation.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    console.error("Consultation submission error:", message);
    return NextResponse.json(
      { error: "Failed to submit consultation request.", details: process.env.NODE_ENV === "development" ? message : undefined },
      { status: 500 }
    );
  }
}
