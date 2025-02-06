export interface IconItem {
    icon: string;
    value: string;
}

export interface TableRowData {
    [key: string]: string | IconItem;
}

export interface TableData {
    headers: string[];
    rows: TableRowData[];
} 