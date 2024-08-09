"use client";

import React from "react";
import { useGlobalContext } from "../context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { eye } from "../utils/Icons";

const Visibility = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.visibility) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { visibility } = forecast;

  const getVisibilityDescription = (visibility: number) => {
    const visibilityKm = Math.round(visibility / 1000);

    if (visibilityKm > 10) return "매우좋음";
    if (visibilityKm > 5) return "좋음";
    if (visibilityKm > 2) return "보통";
    if (visibilityKm <= 2) return "좋지않음";
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] flex flex-col gap-8 border rounded-lg dark:bg-dark-gray shadow-sm dark:shadow-none">
      <div>
        <h2 className="flex items-center gap-2 font-medium">{eye} 가시거리</h2>
        <p className="pt-4 text-2xl">{Math.round(visibility / 1000)}km</p>
      </div>
      <p className="text-sm">{getVisibilityDescription(visibility)}</p>
    </div>
  );
};

export default Visibility;
