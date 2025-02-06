"use server";

export async function generateTable(prompt: string) {
  try {
    const response = await fetch("http://localhost:3000/api/generateTable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) throw new Error("Failed to generate table");

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
