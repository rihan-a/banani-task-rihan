import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
            role: "system",
            content: `You are an AI that generates structured JSON tables based on user prompts.
            - The data should be relevant to the user's prompt.`,
          },
        {
          role: "user",
          content: `Generate a table based on this prompt: ${prompt}. Return only JSON, no explanations, Each row should have a relevant 'icon' to it's value  added inside the first column, which represents a relevant Google Material Symbol.`,
        },

      ],
      response_format: { type: "json_object" },
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error("OpenAI returned an empty response.");
    }

    const content = response.choices[0]?.message?.content;

    
    if (!content) {
      throw new Error("OpenAI response was empty.");
    }

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(content);
      if (!Array.isArray(jsonResponse.headers) || !Array.isArray(jsonResponse.rows)) {
        throw new Error("Invalid JSON structure: Missing 'headers' or 'rows'");
      }
    } catch (error) {
      console.error("Invalid JSON received:", content);
      throw new Error("OpenAI returned an invalid JSON response.");
    }

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Error generating table:", {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: "Failed to generate table", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
