'use client';

import { useState } from "react";
import { Filter } from "@/constants/filter"
import FilterButton from "./FilterButton";
import FilterSettingButton from "./FilterSettingButton";

export default function MapFilter() {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [showFilterTags, setShowFilterTags] = useState(true);
    const [pinState, setPinState] = useState<"pinOn" | "pinOff">("pinOn");

    const handleFilterClick = (filterKey: string) => {
        setActiveFilters((prev) =>
            prev.includes(filterKey)
                ? prev.filter((t) => t !== filterKey)
                : [...prev, filterKey]
        );
    };

    return (
        <>
            {/* showFilterTags === false */}
            {!showFilterTags && (
                <div className="absolute top-3 left-1/12 z-50 bg-white/95 p-3 rounded-2xl shadow flex flex-col gap-1">
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
                <div className="flex absolute top-3 left-1/2 -translate-x-1/2 z-50 w-5/6 items-start gap-5 bg-white/95 p-3 rounded-3xl shadow">
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
                        {Filter.map((filter) => (
                            <FilterButton
                                key={filter.key}
                                label={filter.label}
                                active={activeFilters.includes(filter.key)}
                                onClick={() => handleFilterClick(filter.key)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
