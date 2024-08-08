"use client";

import React from "react";
import { useGlobalContext } from "../context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { thermometerSun } from "../utils/Icons";
import { Progress } from "@/components/ui/progress";
import { airQualityList } from "../utils/tempConvert";

const AirQuality = () => {
  const { airQuality } = useGlobalContext();

  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return (
      <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
    );
  }

  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const filteredIndex = airQualityList.find((item) => {
    return item.rating === airQualityIndex;
  });

  return (
    <div className="col-span-full sm-size:col-span-2 pt-6 px-4 h-[12rem] flex flex-col gap-8 border rounded-lg dark:bg-dark-gray shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">
        {thermometerSun} 통합대기환경지수
      </h2>
      <Progress value={airQualityIndex} max={100} className="progress" />
      <p className="text-sm">공기질 {filteredIndex?.description}</p>
    </div>
  );
};

export default AirQuality;
