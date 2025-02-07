"use client";

import { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { TableData } from "@/types/table";

interface TableProps {
    data: TableData | null;
    error?: string;
}

export default function Table({ data, error }: TableProps) {
    const [tableData, setTableData] = useState<TableData | null>(null);

    useEffect(() => {
        if (data) {
            setTableData(data);
        }
    }, [data]); // Ensure state updates when `data` changes

    const handleDeleteRow = (rowToDelete: any) => {
        if (!tableData || !tableData.rows) return;
        
        const updatedRows = tableData.rows.filter(row => row !== rowToDelete);
        setTableData({ ...tableData, rows: updatedRows });
    };

    if (!tableData || !tableData.headers || tableData.rows.length === 0) {
        return (
            <div className="flex items-center justify-center text-gray-500 text-sm h-[56px] w-[640px] bg-white">
                {error ? <span className="text-red-500">{error}</span> : "No data available"}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <h2 className="w-full mb-2 text-[12px] font-medium text-gray-500">
                New table
            </h2>
            <div className="w-full min-w-[640px] max-w-[900px] overflow-hidden rounded-lg shadow-lg">
                <div className="max-h-[336px] overflow-y-auto bg-white">
                    <table className="table-auto border-collapse text-black font-inter text-sm font-medium leading-6 w-full">
                        <TableHeader headers={tableData.headers} />
                        <TableBody 
                            rows={tableData.rows} 
                            headers={tableData.headers} 
                            onDelete={handleDeleteRow} 
                        />
                    </table>
                </div>
            </div>
        </div>
    );
}
