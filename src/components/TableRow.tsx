"use client"
import { TableRowData, IconItem } from "@/types/table";

interface TableRowProps {
    row: TableRowData;
    headers: string[];
}

export default function TableRow({ row, headers }: TableRowProps) {
    // Helper function to type check if a value is an IconItem
    const isIconItem = (value: any): value is IconItem => {
        return typeof value === 'object' && value !== null && 'icon' in value && 'value' in value;
    };

    return (
        <tr className="hover:bg-gray-50 transition border-b bg-white h-[56px]">
            {headers.map((header, colIndex) => (
                <td key={colIndex} className={`p-2 text-sm text-gray-700 ${colIndex === 0 ? 'font-medium pl-[16px]' : 'font-normal'}`}>
                    {isIconItem(row[header]) ? (
                        <div className="flex items-center">
                            <span className="material-symbols-outlined text-gray-600 mr-2">
                                {row[header].icon}
                            </span>
                            {row[header].value}
                        </div>
                    ) : (
                        row[header]
                    )}
                </td>
            ))}
            <td className="min-w-[48px] pr-[16px]">
                <div className="flex">
                    <span className="material-symbols-outlined">
                        bookmark
                    </span>
                    <span className="material-symbols-outlined pl-[8px]">
                        delete
                    </span>
                </div>
            </td>
        </tr>
    );
}   