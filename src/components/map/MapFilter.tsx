'use client';

import { useState } from "react";
import { FILTER_LIST } from "@/constants/filter"
import FilterButton from "./FilterButton";
import FilterSettingButton from "./FilterSettingButton";
import type { Category } from "@/types/map";

interface MapFilterProps {
    selected: Category[];
    onChange: (next: Category[]) => void;
}

export default function MapFilter({ selected, onChange }: MapFilterProps) {
    
    // 선택된 카테고리 토글
    const toggle = (key: Category) => {
        if (selected.includes(key)) {
            onChange(selected.filter((c) => c !== key));
        } else {
            onChange([...selected, key]);
        }
    };

    const [showFilterTags, setShowFilterTags] = useState(true);
    const [pinState, setPinState] = useState<"pinOn" | "pinOff">("pinOn");

    // const handleFilterClick = (filterKey: string) => {
    //     setActiveFilters((prev) =>
    //         prev.includes(filterKey)
    //             ? prev.filter((t) => t !== filterKey)
    //             : [...prev, filterKey]
    //     );
    // };

    return (
        <>
            {/* showFilterTags === false */}
            {!showFilterTags && (
                <div className="absolute top-3 left-1/12 z-10 bg-white/95 p-3 rounded-2xl shadow flex flex-col gap-1">
                    <FilterSettingButton
                        type="filter"
                        onClick={() => setShowFilterTags(true)}
                    />
                    <FilterSettingButton
                        type={pinState}
                        onClick={() =>
                            setPinState(prev => (prev === "pinOn" ? "pinOff" : "pinOn"))
                        }
                    />
                </div>
            )}

            {/* showFilterTags === true */}
            {showFilterTags && (
                <div className="flex absolute top-3 left-1/2 -translate-x-1/2 z-10 w-5/6 items-start gap-5 bg-white/95 p-3 rounded-3xl shadow">
                    <div className="flex flex-col gap-1">
                        <FilterSettingButton
                            type="filter"
                            onClick={() => setShowFilterTags(false)}
                        />
                        <FilterSettingButton
                            type={pinState}
                            onClick={() =>
                                setPinState(prev => (prev === "pinOn" ? "pinOff" : "pinOn"))
                            }
                        />
                    </div>

                    <div className="flex flex-wrap w-full gap-2">
                        {FILTER_LIST.map((filter) => (
                            <FilterButton
                                key={filter.key}
                                label={filter.label}
                                active={selected.includes(filter.key)}
                                onClick={() => toggle(filter.key)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
