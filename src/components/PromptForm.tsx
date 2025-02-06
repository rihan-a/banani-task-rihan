"use client";
import { useState, useTransition } from "react";
import { generateTable } from "@/lib/actions"; // Import server action

export default function PromptForm({ onGenerate }: { onGenerate: (data: any) => void }) {
  const [prompt, setPrompt] = useState("");
  const [loading, startTransition] = useTransition(); // For async actions

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    startTransition(async () => {
      const data = await generateTable(prompt);
      if (data) onGenerate(data);
    });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="h-[230px] w-[280px] bg-white rounded-tl-[12px] rounded-tr-[28px] rounded-br-[28px] rounded-bl-[28px] shadow-lg relative"
    >
      <textarea
        className="w-[240px] h-[120px] min-h-[48px]  font-inter text-sm text-gray-700 leading-6 mt-5 ml-5 outline-none resize-none"
        placeholder="What kind of table do you want to generate?"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-full w-10 h-10 bg-gray-500 flex items-center justify-center absolute top-[178px] left-[228px] hover:bg-blue-500 transition"
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin material-symbols-outlined text-white">autorenew</span>
        ) : (
          <span className="material-symbols-outlined text-white">arrow_upward_alt</span>
        )}
      </button>
    </form>
  );
}
