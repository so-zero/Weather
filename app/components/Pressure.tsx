"use client";

import React from "react";
import { useGlobalContext } from "../context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { gauge } from "../utils/Icons";

const Pressure = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { pressure } = forecast?.main;

  const getPressureDescription = (pressure: number) => {
    if (pressure < 1013.25) return "저기압";
    if (pressure >= 1013.25) return "고기압";
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] flex flex-col gap-8 border rounded-lg dark:bg-dark-gray shadow-sm dark:shadow-none">
      <div>
        <h2 className="flex items-center gap-2 font-medium">{gauge} 기압</h2>
        <p className="pt-4 text-2xl">{pressure}hpa</p>
      </div>
      <p className="text-sm">{getPressureDescription(pressure)}</p>
    </div>
  );
};

export default Pressure;
