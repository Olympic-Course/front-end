"use client";

import { useState, useEffect } from "react";
import BottomModal from "@/components/common/BottomModal";
import HeaderLayout from "@/components/common/HeaderLayout";
import MenuSection from "@/components/common/MenuSection";
import EditCourseSection from "@/components/course/EditCourseSection";
import SelectedLocationItem from "@/components/course/SelectedLocationItem";
import PrimaryButton from "@/components/common/PrimaryButton";
import { useRouter } from "next/navigation";
import CourseSettinKakaoMap from "@/components/map/CourseSettingKakaoMap";
import { useCourseCreateStore } from "@/store/courseCreateStore";

export default function Page() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);

    const [selectedLocation, setSelectedLocation] = useState<{
        name: string;
        latitude: number;
        longitude: number;
    } | null>(null);

    const { steps, setSteps  } = useCourseCreateStore();

    const [tempSteps, setTempSteps] = useState<
        {
            name: string;
            latitude: number;
            longitude: number;
            description: string;
            photos: string[];
        }[]
    >([]);

    useEffect(() => {
        if (steps.length > 0) {
            setTempSteps(
                steps.map((s) => ({
                    name: s.name,
                    latitude: s.latitude,
                    longitude: s.longitude,
                    description: s.description,
                    photos: s.photos ?? [],
                }))
            );
        }
    }, []);

    const handleAddTempStep = (stepName: string) => {
        if (!selectedLocation) return;

        setTempSteps((prev) => [
            ...prev,
            {
                name: stepName,
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
                description: "",
                photos: [],
            },
        ]);
    };

    const handleDeleteTempStep = (index: number) => {
        setTempSteps((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            return updated;
        });
    };

    const moveStep = (fromIndex: number, toIndex: number) => {
        setTempSteps((prev) => {
            const newList = [...prev];
            const item = newList.splice(fromIndex, 1)[0];
            newList.splice(toIndex, 0, item);
            return newList;
        });
    };

    const handleUpdateDescription = (index: number, value: string) => {
        setTempSteps((prev) => {
            const newList = [...prev];
            newList[index].description = value;
            return newList;
        });
    };

    const saveAllTempSteps = () => {
        const nextSteps = tempSteps.map((s, idx) => ({
            stepOrder: idx + 1,
            name: s.name,
            latitude: s.latitude,
            longitude: s.longitude,
            description: s.description,
            photos: s.photos,
        }));

        setSteps(nextSteps);
        router.back();
    };


    const handleAddPhoto = (index: number, fileName: string) => {
        setTempSteps(prev => {
            const arr = [...prev];
            arr[index].photos.push(fileName);
            return arr;
        });
    };

    const handleRemovePhoto = (index: number, photoIndex: number) => {
        setTempSteps(prev => {
            const arr = [...prev];
            arr[index].photos = arr[index].photos.filter((_, i) => i !== photoIndex);
            return arr;
        });
    };


    return (
        <HeaderLayout title={"장소 추가하기"}>
            <div className="flex flex-col h-[calc(100vh-64px)]">
                <div className="w-full h-full">
                    <CourseSettinKakaoMap
                        onSelectLocation={(loc) => {
                            setSelectedLocation(loc);
                        }}
                        tempSteps={tempSteps}
                    />
                </div>

                <BottomModal
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                >
                    <div className="flex-1 w-full overflow-y-auto px-5 pb-5 flex flex-col gap-5">
                        <MenuSection title={"선택된 장소"}>
                            {selectedLocation ? (
                                <SelectedLocationItem
                                    locationIcon={"/icons/CONVENIENCE.svg"}
                                    name={selectedLocation.name}
                                    latitude={selectedLocation.latitude}
                                    longitude={selectedLocation.longitude}
                                    onAddTempStep={handleAddTempStep}
                                />
                            ) : (
                                <div className="text-xs text-[#8E8E93]">
                                    지도를 눌러 장소를 선택해주세요
                                </div>
                            )}
                        </MenuSection>
                        <MenuSection title={"추가된 장소"}>
                            <div className="flex flex-col w-full gap-2">
                                {tempSteps.map((step, idx) => (
                                    <EditCourseSection
                                        key={idx}
                                        stepOrder={idx + 1}
                                        name={step.name}
                                        onDelete={() => handleDeleteTempStep(idx)}
                                        onMoveUp={idx > 0 ? () => moveStep(idx, idx - 1) : undefined}
                                        onMoveDown={idx < tempSteps.length - 1 ? () => moveStep(idx, idx + 1) : undefined}
                                        description={step.description}
                                        photos={step.photos}
                                        onChangeDescription={(value) => handleUpdateDescription(idx, value)}
                                        onAddPhoto={(fileName) => handleAddPhoto(idx, fileName)}
                                        onRemovePhoto={(photoIndex) => handleRemovePhoto(idx, photoIndex)}
                                    />
                                ))}
                            </div>
                        </MenuSection>
                        <PrimaryButton
                            onClick={saveAllTempSteps}
                            label={"추가 및 편집된 장소 저장"}
                        />
                    </div>
                </BottomModal>
            </div>
        </HeaderLayout>
    );
}