import EditCourseLocationItem from "./EditCourseLocationItem";
import EditCourseLocationMemo from "./EditCourseLocationMemo";

export default function EditCourseSection(){
    return(
        <div className="flex flex-col w-full gap-1">
            <EditCourseLocationItem stepOrder={1} name={"체조경기장"}/>
            <EditCourseLocationMemo/>
        </div>
    );
}