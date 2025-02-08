import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { a } from "framer-motion/client";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const schema = {
            tableName: "Table Name",
            headers: ["Column 1", "Column 2", "Column 3"],
            rows: [
                {
                    "Column 1": {
                        icon: "example_icon",
                        value: "Example Value",
                    },
                    "Column 2": "Example Text",
                    "Column 3": "Another Example",
                },
            ],
            actions: false,
        };

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [
                {
                    role: "system",
                    content: `You are an AI that generates structured JSON tables based on user prompts. If the user prompt is **unclear, irrelevant, or nonsensical**, you **must return**:
                    \`\`\`json
                    { "error": "Invalid prompt. Please enter a relevant request." }
                    \`\`\`

                    Otherwise, strictly return a table using this schema:
                    \`\`\`json
                    ${JSON.stringify(schema, null, 2)}
                    \`\`\`
                    
                    **Formatting Rules:**
                    - Return JSON **only** (no explanations).
                    - **If the prompt is vague or unrelated to a table**, return { "error": "Invalid prompt. Please enter a relevant request." }.
                    - **headers**: An array of column names.
                    - **rows**: An array of objects where each key corresponds to a column from "headers".
                    - **Only the first column** should include an icon in the format: \`{"icon": "icon_name", "value": "actual_value"}\`.
                    - **All other columns** should only return string values.
                    - Do **not** include an icon in any column except the first one.
                    - The first column should always be the row title.
                    - **actions**: A boolean value, false by default, only include if the user's prompt includes the words "actions" or "edit" or "delete" or "save".
                    - Create a table name that is relevant to the user's prompt.
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
            if (typeof content !== "string") {
                throw new Error("Invalid response: Expected a JSON string.");
            }

            jsonResponse = JSON.parse(content);

            if (
                !Array.isArray(jsonResponse.headers) ||
                !Array.isArray(jsonResponse.rows)
            ) {
                throw new Error(
                    "Invalid JSON structure: Missing 'headers' or 'rows'."
                );
            }
        } catch (error) {
            console.error("Invalid JSON received:", content);
            console.error("Parsing error:", error); // Log the original error for debugging

            throw new Error("OpenAI returned an invalid JSON response.");
        }

        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error("Error generating table:", {
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined,
        });

        return NextResponse.json(
            {
                error: "Failed to generate table",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
