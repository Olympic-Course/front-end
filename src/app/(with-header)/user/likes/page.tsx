import SearchBar from "@/components/common/SearchBar";
import Tag from "@/components/common/Tag";

export default function Page() {
  return (
    <div className="flex flex-col h-full px-10 justify-start items-center gap-5">
      <SearchBar></SearchBar>
      <Tag label={"뚜벅이"}></Tag>
    </div>
  )
}
