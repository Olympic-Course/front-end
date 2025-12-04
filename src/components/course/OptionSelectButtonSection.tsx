import OptionSelectButton from "./OptionSelectButton";
import { DurationOptions } from "@/constants/durationOptions";
import { CostOptions } from "@/constants/costOptions";

interface OptionSelectButtonSectionProps {
    type: "duration" | "cost";
    selected: string;
    onSelect: (value: string) => void;
}

export default function OptionSelectButtonSection({ type, selected, onSelect }: OptionSelectButtonSectionProps) {
    const options = type === "duration" ? DurationOptions : CostOptions;

    return (
        <div className="grid grid-cols-2 w-full gap-1.5 mt-1.5">
            {options.map((option) => (
                <OptionSelectButton
                    key={option.key}
                    option={option}
                    active={selected === option.key}     // key 비교
                    onClick={() => onSelect(option.key)} // key 넘김
                />
            ))}
        </div>
    );
}