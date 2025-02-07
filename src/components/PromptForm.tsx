"use client";
import { useState, useTransition } from "react";
import { generateTable } from "@/lib/actions"; // Import server action
import { TableData } from "@/types/table";

interface PromptFormProps {
    onGenerate: (data: TableData | null) => void;
}

export default function PromptForm({ onGenerate }: PromptFormProps) {
    const [prompt, setPrompt] = useState("");
    const [loading, startTransition] = useTransition(); // For async actions

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        startTransition(async () => {
            try {
                const data = await generateTable(prompt);

                if (data?.headers?.length && data?.rows?.length) {
                    console.log("data here in promptForm", data); // for debugging
                    onGenerate(data); // reurn data
                    setPrompt(""); // Clear the input
                }
            } catch (error) {
                console.log("Error generating table:", error); // for debugging
                onGenerate(null);
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="h-[230px] w-[280px] bg-white rounded-tl-[12px] rounded-tr-[28px] rounded-br-[28px] rounded-bl-[28px] shadow-lg relative"
        >
            <textarea
                className={`w-[240px] h-[120px] min-h-[48px] font-inter text-sm leading-6 mt-5 ml-5 outline-none resize-none ${
                    prompt ? "text-black" : "text-gray-700"
                }`}
                placeholder="What kind of table do you want to generate?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button
                type="submit"
                className={`rounded-full w-10 h-10 flex items-center justify-center absolute top-[178px] left-[228px] transition ${
                    prompt.trim()
                        ? "bg-[#1784EF] hover:bg-[#176def]"
                        : "bg-[#A6A6A6] cursor-not-allowed"
                }`}
                disabled={loading || !prompt.trim()}
            >
                {loading ? (
                    <span className="animate-spin material-symbols-outlined text-white">
                        autorenew
                    </span>
                ) : (
                    <span className="material-symbols-outlined text-white">
                        arrow_upward_alt
                    </span>
                )}
            </button>
        </form>
    );
}
