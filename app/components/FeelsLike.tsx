"use client";

import React from "react";
import { useGlobalContext } from "../context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { thermometer } from "../utils/Icons";
import { toCelsius } from "../utils/tempConvert";

const FeelsLike = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { feels_like, temp_min, temp_max } = forecast?.main;

  console.log(forecast?.main?.feels_like);

  const feelsLikeText = (
    feelsLike: number,
    minTemp: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemp + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) {
      return "실제온도보다 체감온도가 훨씬 낮습니다.";
    } else if (feelsLike < avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return "실제기온과 체감온도가 비슷합니다.";
    } else if (feelsLike < avgTemp + 5) {
      return "실제온도보다 체감온도가 훨씬 높습니다.";
    } else {
      return "실제온도와 체감온도의 차이가 큽니다.";
    }
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] flex flex-col gap-8 border rounded-lg dark:bg-dark-gray shadow-sm dark:shadow-none">
      <div>
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} 체감온도
        </h2>
        <p className="pt-4 text-2xl">{toCelsius(feels_like)}°</p>
      </div>
      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  );
};

export default FeelsLike;
