"use client";

import React from "react";
import { useGlobalContext } from "../context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { sunDim } from "../utils/Icons";
import { Progress } from "@/components/ui/progress";

const UvIndex = () => {
  const { uvIndex } = useGlobalContext();

  if (!uvIndex || !uvIndex.daily) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { daily } = uvIndex;
  const { uv_index_clear_sky_max, uv_index_max } = daily;

  const uvIndexMax = uv_index_max[0].toFixed(0);

  const uvIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) {
      return {
        text: "낮음",
        description: "따로 대비하지않아도 무방",
      };
    } else if (uvIndex <= 5) {
      return {
        text: "보통",
        description: "모자, 선글라스 사용",
      };
    } else if (uvIndex <= 7) {
      return {
        text: "높음",
        description: "긴소매옷과 양산, 자외선 차단제",
      };
    } else if (uvIndex <= 10) {
      return {
        text: "매우 높음",
        description: "한낮에는 외출자제",
      };
    } else {
      return {
        text: "위험",
        description: "가능한 한 실내활동",
      };
    }
  };

  const uvPercentage = (uvIndexMax / 14) * 100;

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] flex flex-col gap-8 border rounded-lg dark:bg-dark-gray shadow-sm dark:shadow-none">
      <div>
        <h2 className="flex items-center gap-2 font-medium">
          {sunDim} 자외선 지수
        </h2>
        <div className="pt-4 flex flex-col gap-1">
          <p className="text-2xl">
            {uvIndexMax}
            <span className="text-sm">
              ({uvIndexCategory(uvIndexMax).text})
            </span>
          </p>
          <Progress value={uvPercentage} max={14} className="progress" />
        </div>
      </div>
      <p className="text-sm">{uvIndexCategory(uvIndexMax).description}</p>
    </div>
  );
};

export default UvIndex;
