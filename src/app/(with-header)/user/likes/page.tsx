import LikeIcon from "@/components/common/LikeIcon";
import SearchBar from "@/components/common/SearchBar";
import Tag from "@/components/common/Tag";

export default function Page() {
  return (
    <div className="flex flex-col h-full px-10 justify-start items-center gap-5">
      <SearchBar></SearchBar>
      <Tag label={"뚜벅이"}></Tag>
      <LikeIcon liked={false} count={150}></LikeIcon>
      <LikeIcon liked={true} count={12}></LikeIcon>
    </div>
  )
}
