"use client";

import React from "react";
import { useGlobalContext } from "../context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { unixToTime } from "../utils/tempConvert";
import { sunset } from "../utils/Icons";

const Sunset = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const times = forecast?.sys?.sunset;
  const timezone = forecast?.timezone;

  const sunsetTime = unixToTime(times, timezone);
  const sunrise = unixToTime(forecast?.sys?.sunrise, timezone);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] flex flex-col gap-8 border rounded-lg dark:bg-dark-gray shadow-sm dark:shadow-none">
      <div>
        <h2 className="flex items-center gap-2 font-medium">{sunset} 일몰</h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>
      <p className="text-sm">일출: {sunrise}</p>
    </div>
  );
};

export default Sunset;
