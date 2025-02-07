"use client";
import { useState } from "react";
import PromptForm from "./PromptForm";
import Table from "./Table";
import { TableData } from "@/types/table";

export default function Dashboard() {
    const [tableData, setTableData] = useState<TableData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleGenerate = (result: TableData | { error: string }) => {
        if ('error' in result) {
            setErrorMessage(result.error);
            setTableData(null);
        } else {
            setTableData(result);
            setErrorMessage(null);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center relative">
            <div className="absolute top-[12px] left-[12px]">
                <PromptForm onGenerate={handleGenerate} />
            </div>

            <div className="flex items-center justify-center">
                <Table data={tableData} error={errorMessage} />
            </div>
        </div>
    );
}
