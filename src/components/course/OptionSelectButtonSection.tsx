import OptionSelectButton from "./OptionSelectButton";
import { durationOptions } from "@/constants/durationOptions";
import { costOptions } from "@/constants/costOptions";

interface OptionSelectButtonSectionProps {
    type: "duration" | "cost";
    selected: string;
    onSelect: (value: string) => void;
}

export default function OptionSelectButtonSection({ type, selected, onSelect }: OptionSelectButtonSectionProps) {
    const options = type === "duration" ? durationOptions : costOptions;

    return (
        <div className="grid grid-cols-2 w-full gap-1.5 mt-1.5">
            {options.map((option, idx) => (
                <OptionSelectButton
                    key={idx}
                    option={option}
                    active={selected === option}
                    onClick={() => onSelect(option)}
                />
            ))}
        </div>
    );
}