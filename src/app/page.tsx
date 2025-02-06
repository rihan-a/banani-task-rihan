import PromptForm from "../components/PromptForm";
import Table from "../components/Table";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center relative ">
            <div className="absolute top-[12px] left-[12px]">
                <PromptForm />
            </div>

            <div className="flex items-center justify-center">
                <Table />
            </div>
        </div>
  );
}
