import TableRow from "./TableRow";
import { TableComponentsProps, TableRowData } from "@/types/table";

interface TableBodyProps extends TableComponentsProps {
    rows: TableRowData[];
}

export default function TableBody({ rows, headers, onDelete, actions }: TableBodyProps) {
    return (
        <tbody>
            {rows.map((row, index) => (
                <TableRow key={index} row={row} headers={headers} onDelete={onDelete} actions={actions} />
            ))}
        </tbody>
    );
} 
