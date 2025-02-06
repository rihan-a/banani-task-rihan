"use client";
import { useState } from "react";
import PromptForm from "./PromptForm";
import Table from "./Table";

export default function Dashboard() {
  const [tableData, setTableData] = useState<any>(null);

  return (
   
<div className="h-screen flex items-center justify-center relative ">
<div className="absolute top-[12px] left-[12px]">
    <PromptForm onGenerate={setTableData}/>
</div>

<div className="flex items-center justify-center">
    <Table data={tableData}/>
</div>
</div>
  );
}

