"use client";
import { useState, useTransition } from "react";
import { generateTable } from "@/lib/actions"; // Import server action
import { TableData } from "@/types/table";

interface PromptFormProps {
    onGenerate: (data: TableData | { error: string }) => void;
    setLoading: (loading: boolean) => void;
}

export default function PromptForm({ onGenerate, setLoading }: PromptFormProps) {
    const [prompt, setPrompt] = useState("");
    const [loading, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);

        startTransition(async () => {
            try {
                const data = await generateTable(prompt);

                if ('error' in data) {
                    onGenerate({ error: data.error || "Failed to generate table" });
                    setPrompt("");
                } else {
                    console.log("data here in promptForm", data);
                    onGenerate(data);
                    setPrompt("");
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log("Error generating table:", error);
                    onGenerate({ error: error.message || "Failed to generate table, please write a more specific prompt" });
                    setPrompt("");
                }
                setPrompt("");
            }
        });
    };
   // handle "Enter" key press in the textarea
   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // prevent new line
        handleSubmit(e); // trigger form submission
    }
};



    return (
        <form
            onSubmit={handleSubmit}
            className="h-[230px] w-[96vw] md:w-[280px] bg-white rounded-tl-[12px] rounded-tr-[28px] relative rounded-br-[28px] rounded-bl-[28px] shadow-lg ">
            <textarea
                className={`w-[240px] h-[120px] min-h-[48px] font-inter text-sm leading-6 mt-5 ml-5 outline-none resize-none ${
                    prompt ? "text-black" : "text-gray-700"}`}
                placeholder="What kind of table do you want to generate?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown} />
            <button
                type="submit"
                className={`rounded-full w-10 h-10 flex items-center justify-center absolute  bottom-[12px] right-[12px] md:top-[178px] md:left-[228px] transition ${
                    prompt.trim()
                        ? "bg-[#1784EF] hover:bg-[#176def]"
                        : "bg-[#A6A6A6] cursor-not-allowed"
                }`}
                disabled={loading || !prompt.trim()}>
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
