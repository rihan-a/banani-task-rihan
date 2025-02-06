export default function PromptForm() {
  return (
    <form className=" h-[230px] w-[280px] bg-white rounded-tl-[12px] rounded-tr-[28px] rounded-br-[28px] rounded-bl-[28px] shadow-[0_16px_28px_0_rgba(0,0,0,0.08)] relative">
    <textarea
        className="w-[240px] min-h-[48px] opacity-90 font-inter font-normal text-sm text-[#888788] leading-6 mt-[20px] ml-[20px] outline-none resize-none"
        placeholder="What kind of table do you want to generate ?"
    />
    <button
        type="submit"
        className="rounded-full  w-10 h-10 bg-[#A6A6A6] flex items-center justify-center absolute top-[178px] left-[228px] hover:bg-[#1784EF] transition">
        <span className="material-symbols-outlined text-white ">
            arrow_upward_alt
        </span>
    </button>
</form>
)
}


