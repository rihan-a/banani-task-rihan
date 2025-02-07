import TableRow from "./TableRow";

interface TableBodyProps {
    rows: any[];
    headers: string[];
    onDelete: (row: any) => void;
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
