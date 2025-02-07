import TableRow from "./TableRow";
import { TableRowData } from "@/types/table";

interface TableBodyProps {
    rows: TableRowData[];
    headers: string[];
    onDelete: (row: TableRowData) => void;
}

export default function TableBody({ rows, headers, onDelete }: TableBodyProps) {
    return (
        <tbody>
            {rows.map((row, index) => (
                <TableRow key={index} row={row} headers={headers} onDelete={onDelete} />
            ))}
        </tbody>
    );
} 
