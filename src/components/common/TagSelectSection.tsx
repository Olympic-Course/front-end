'use client';

import { useState } from "react";
import TagButton from "./TagButton";
import { Tags } from "@/constants/tags"
import { useCourseCreateStore } from "@/store/courseCreateStore"

export default function TagSelectSection() {
    const { tags, toggleTag } = useCourseCreateStore();

    const [activeTags, setActiveTags] = useState<string[]>([]);

    // const handleTagClick = (tagKey: string) => {
    //     setActiveTags((prev) =>
    //         prev.includes(tagKey)
    //             ? prev.filter((t) => t !== tagKey)
    //             : [...prev, tagKey]
    //     );
    // };

    const handleTagClick = (tagKey: string) => {
        toggleTag(tagKey);
    };

    return (
        <div className="flex flex-wrap gap-2">
            {Tags.map((tag) => (
                <TagButton
                    key={tag.key}
                    label={tag.label}
                    active={tags.includes(tag.key)}
                    onClick={() => handleTagClick(tag.key)}
                />
            ))}
        </div>
    );
}