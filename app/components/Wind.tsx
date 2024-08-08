"use client";

import React from "react";
import { useGlobalContext } from "../context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { wind } from "../utils/Icons";
import Image from "next/image";

const Wind = () => {
  const { forecast } = useGlobalContext();

  const windSpeed = forecast?.wind?.speed;
  const windDir = forecast?.wind?.deg;

  if (!windSpeed || !windDir) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] flex flex-col gap-3 border rounded-lg dark:bg-dark-gray shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">{wind} 바람</h2>
      <div className="relative flex justify-center items-center">
        <div className="relative">
          <Image
            src="/compass_body.svg"
            alt="compass"
            width={110}
            height={110}
          />
          <Image
            src="/compass_arrow.svg"
            alt="compass"
            className="absolute top-0 left-[50%] transition-all duration-500 ease-in-out dark:invert"
            style={{
              transform: `rotate(${windDir}deg) translateX(-50%)`,
              height: "100%",
            }}
            width={11}
            height={11}
          />
        </div>
        <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] dark:text-white font-medium text-sm">
          {Math.round(windSpeed)} m/s
        </p>
      </div>
    </div>
  );
};

export default Wind;
