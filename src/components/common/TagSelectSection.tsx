'use client';

import { useState } from "react";
import TagButton from "./TagButton";
import { Tags } from "@/constants/tags"
import { useCourseCreateStore } from "@/store/courseCreateStore"

interface TagSelectSectionProps {
    selectedTags?: string[];
    onChangeTags: (tags: string[]) => void;
}

export default function TagSelectSection({
    selectedTags= [],
    onChangeTags,
}: TagSelectSectionProps) {

    // const handleTagClick = (tagKey: string) => {
    //     toggleTag(tagKey);
    // };

    const handleTagClick = (tagKey: string) => {
        if (selectedTags.includes(tagKey)) {
            // 선택 해제
            onChangeTags(selectedTags.filter(t => t !== tagKey));
        } else {
            // 선택 추가
            onChangeTags([...selectedTags, tagKey]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {Tags.map((tag) => (
                <TagButton
                    key={tag.key}
                    label={tag.label}
                    active={selectedTags.includes(tag.key)}
                    onClick={() => handleTagClick(tag.key)}
                />
            ))}
        </div>
    );
}