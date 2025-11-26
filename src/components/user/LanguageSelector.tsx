import LanguageItem from "./LanguageItem";

interface LanguageSelectorProps {
    selectedLanguage: string;
    onChangeLanguage: (lang: string) => void;
}

export default function LanguageSelector({
    selectedLanguage,
    onChangeLanguage,
}: LanguageSelectorProps) {
    return (
        <div className="flex flex-col items-start justify-start gap-2">
            <label className="text-sm font-medium flex items-center gap-1">
                언어<span className="text-red-500">*</span>
            </label>
            <div className="relative w-full">
                <LanguageItem
                    language="ko"
                    label="한국어"
                    selected={selectedLanguage === "ko"}
                    onClick={() => onChangeLanguage("ko")}
                />
                <LanguageItem
                    language="en"
                    label="English"
                    selected={selectedLanguage === "en"}
                    onClick={() => onChangeLanguage("en")}
                />
            </div>
        </div>
    );
}