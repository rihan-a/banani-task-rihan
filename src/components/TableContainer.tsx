"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableSkeleton from "./TableSkeleton";
import { TableData, TableRowData } from "@/types/table";

interface TableContainerProps {
    data: TableData | null;
    loading: boolean;
    error?: string;
}

export default function TableContainer({ data, loading, error }: TableContainerProps) {
    const [tableData, setTableData] = useState<TableData | null>(null);

    // sync state with data when it changes
    useEffect(() => {
        setTableData(data);
    }, [data]);
    // handle delete row and update table data state
    const handleDeleteRow = (rowToDelete: TableRowData) => {
        if (!tableData || !tableData.rows) return;
        setTableData(prevData => ({
            ...prevData!,
            rows: prevData!.rows.filter(row => row !== rowToDelete),
        }));
    };

    return (
        <div className="w-full overflow-x-auto rounded-[4px] shadow-lg">
            <div className="max-h-[300px] bg-white min-h-[56px] w-[96vw] sm:w-[200px] md:w-[640px] lg:w-[740px]">
                {/* error handling here */}
                {error && !loading && (
                    <div className="text-red-500 text-center p-3">{error}</div>
                )}

                <AnimatePresence mode="wait">
                    {loading ? (
                        <TableSkeleton key="loading" />
                    ) : (
                        <motion.div
                            key="table"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                        >
                            {tableData && tableData.headers.length > 0 && (
                                <table className="table-auto border-collapse text-black font-inter text-sm font-medium leading-6 w-[96vw] sm:w-[200px] md:w-[640px] lg:w-[740px]">
                                    <TableHeader 
                                        headers={tableData.headers} 
                                        hasData={tableData.rows.length > 0} 
                                    />
                                    <TableBody 
                                        rows={tableData.rows} 
                                        headers={tableData.headers} 
                                        onDelete={handleDeleteRow} 
                                    />
                                </table>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
