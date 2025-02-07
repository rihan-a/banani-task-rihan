"use client";

import { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { TableData, TableRowData } from "@/types/table";

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
    }, [data]);

    const handleDeleteRow = (rowToDelete: TableRowData) => {
        if (!tableData || !tableData.rows) return;
        
        const updatedRows = tableData.rows.filter(row => row !== rowToDelete);
        setTableData({ ...tableData, rows: updatedRows });
    };

    if (!tableData || !tableData.headers || tableData.rows.length === 0) {
        return (
            <div className="w-[350px] sm:w-[400px] md:w-[640px] lg:w-[640px]  flex items-center justify-center text-gray-500 text-sm h-[56px] bg-white">
                {error ? <span className="text-red-500  p-3  ">{error}</span> : ""}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 w-full mt-[100px]">
            <h2 className="w-full mb-2 text-[12px] font-medium text-gray-500">
                New table
            </h2>
            <div className="w-full overflow-x-auto rounded-lg shadow-lg">
                <div className="max-h-[336px] bg-white">
                    <table className="table-auto border-collapse text-black font-inter text-sm font-medium leading-6 w-[96vw] sm:w-[200px] md:w-[640px] lg:w-[640px]">
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
