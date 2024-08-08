"use client";

import React from "react";
import { useGlobalContext } from "../context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { cloudSun, cloudy, drizzle, rain, snow } from "../utils/Icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import moment from "moment";
import { toCelsius } from "../utils/tempConvert";

const WeatherForecast = () => {
  const { forecast, fiveDayForecast } = useGlobalContext();

  const { weather } = forecast;
  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  if (!forecast || !weather) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const todaysForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => {
      return forecast.dt_txt.startsWith(todayString);
    }
  );

  const { main: weatherMain } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzle;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return cloudSun;
      case "Clouds":
        return cloudy;
      default:
        return cloudSun;
    }
  };

  return (
    <div className="pt-6 px-4 h-[12rem] flex flex-col gap-8 border rounded-lg dark:bg-dark-gray shadow-sm dark:shadow-none col-span-full sm-size:col-span-2 md:col-span-2 xl:col-span-2">
      <div className="h-full flex gap-10 overflow-hidden">
        {todaysForecast.length < 1 ? (
          <div>
            <h1 className="text-[3rem] line-through text-rose-500">
              날씨 정보가 없습니다.
            </h1>
          </div>
        ) : (
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {todaysForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => {
                    return (
                      <CarouselItem
                        key={forecast.dt_txt}
                        className="flex flex-col gap-4 basis-[8.5rem] cursor-grab"
                      >
                        <p className="text-gray-300">
                          {moment(forecast.dt_txt).format("HH:mm")}
                        </p>
                        <p>{getIcon()}</p>
                        <p className="mt-4">
                          {toCelsius(forecast.main.temp)} °C
                        </p>
                      </CarouselItem>
                    );
                  }
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;
