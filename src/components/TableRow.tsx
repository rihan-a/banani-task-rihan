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
        <tr className="hover:bg-gray-50 transition border-b bg-white">
            {headers.map((header, colIndex) => (
                <td key={colIndex} className="p-3 text-sm text-gray-700">
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
            <td className="p-3">
                <div className="flex">
                    <span className="material-symbols-outlined">
                        bookmark
                    </span>
                    <span className="material-symbols-outlined pl-[10px]">
                        more_horiz
                    </span>
                </div>
            </td>
        </tr>
    );
}   