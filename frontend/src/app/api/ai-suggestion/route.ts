import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI suggestions are not configured. Please add your Google AI API key." },
      { status: 503 }
    );
  }

  try {
    const { projectType, projectDescription, targetAudience, keyFeatures, existingSolution } =
      await req.json();

    if (!projectDescription || projectDescription.trim().length < 10) {
      return NextResponse.json(
        { error: "Project description is too short." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a software consultant at a tech agency. A client wants to build a ${projectType} project.

Project description: ${projectDescription}
Target audience: ${targetAudience || "Not specified"}
Key features: ${keyFeatures}
Existing solution: ${existingSolution || "None"}

Provide a brief, helpful suggestion (3-5 sentences) covering:
1. A recommended tech stack
2. One key consideration they should keep in mind
3. A potential feature they might not have thought of

Keep it concise, friendly, and practical. Do not use markdown formatting.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ suggestion: text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("AI suggestion error:", message);
    return NextResponse.json(
      { error: "Unable to generate suggestions right now.", details: process.env.NODE_ENV === "development" ? message : undefined },
      { status: 500 }
    );
  }
}
