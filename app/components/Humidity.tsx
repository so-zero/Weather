"use client";

import React from "react";
import { droplets } from "../utils/Icons";
import { useGlobalContext } from "../context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

const Humidity = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { humidity } = forecast?.main;

  const getHumidityText = (humidity: number) => {
    if (humidity < 68) return "습도 낮음";
    if (humidity >= 68 && humidity < 75) return "습도 보통";
    if (humidity >= 75 && humidity < 80) return "습도 높음";
    if (humidity >= 80) return "습도 매우높음";
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] flex flex-col gap-8 border rounded-lg dark:bg-dark-gray shadow-sm dark:shadow-none">
      <div>
        <h2 className="flex items-center gap-2 font-medium">{droplets} 습도</h2>
        <p className="pt-4 text-2xl">{humidity}%</p>
      </div>
      <p className="text-sm">{getHumidityText(humidity)}</p>
    </div>
  );
};

export default Humidity;
