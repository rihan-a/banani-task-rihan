"use client";

export default function Table() {
  
  return (
    <div className="flex flex-col items-center justify-center relative">
    <h2 className="absolute top-[-25px] left-[0px] text-[12px] font-inter font-medium leading-5 text-left text-[#888788]">
        New table
    </h2>
    <div className="w-full max-w-9/10 mx-auto overflow-x-auto rounded-[10px] "> 
    <table className="w-full text-black font-inter text-sm font-medium leading-6 border-separate border-spacing-y-[2px]"> 
        <thead>
            <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
            </tr>
        </thead>
        </table>
    </div>
    </div>
        
  );
}
