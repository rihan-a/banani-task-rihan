"use server";
import { TableData } from "@/types/table";

export async function generateTable(
    prompt: string
): Promise<TableData | { error: string }> {
    try {
        const apiUrl =
            process.env.API_URL || "http://localhost:3000/api/generateTable";
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok)
            throw new Error(`Failed to generate table: ${response.statusText}`);

        const data = await response.json();
        if (!data.headers || !data.rows) {
            throw new Error("Invalid table data");
        }

        return data;
    } catch (error) {
        console.error("Error:", error);
        return {
            error:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        };
    }
}
