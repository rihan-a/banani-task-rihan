"use client";
import { useState } from "react";
import PromptForm from "./PromptForm";
import Table from "./Table";
import { TableData } from "@/types/table";

export default function Dashboard() {
    const [tableData, setTableData] = useState<TableData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = (result: TableData | { error: string }) => {
        setLoading(false);
        if ('error' in result) {
            setErrorMessage(result.error);
            setTableData(null);
        } else {
            setTableData(result);
            setErrorMessage(null);
        }
    };

    return (
        <div 
            className="flex items-center justify-center h-screen w-screen relative"
            style={{ backgroundImage: 'url("https://rihanbucket.s3.us-east-1.amazonaws.com/AI/background-banani-task.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute top-[12px] md:left-[12px]">
                <PromptForm onGenerate={handleGenerate} setLoading={setLoading} />
            </div>

            <div className="flex items-center justify-center">
                <Table data={tableData} error={errorMessage || undefined} loading={loading} />
            </div>
        </div>
    );
}
