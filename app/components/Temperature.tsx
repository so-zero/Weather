"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import { toCelsius } from "../utils/tempConvert";
import {
  cloudSun,
  cloudy,
  drizzle,
  navigation,
  rain,
  snow,
} from "../utils/Icons";
import moment from "moment-timezone";
import "moment/locale/ko";

const Temperature = () => {
  const { forecast } = useGlobalContext();
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const { main, timezone, name, weather } = forecast;

  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().tz("Asia/Seoul");
      const formatTime = localMoment.format("HH:mm:ss");
      const day = localMoment.format("dddd");

      setLocalTime(formatTime);
      setCurrentDay(day);
    }, 1000);
  }, []);

  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }

  const temp = toCelsius(main?.temp);
  const minTemp = toCelsius(main?.temp_min);
  const maxTemp = toCelsius(main?.temp_max);

  const { main: weatherMain, description } = weather[0];

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
    <div className="border rounded-lg pt-6 pb-5 px-4 flex flex-col justify-between dark:bg-dark-gray shadow-sm dark:shadow-none">
      <p className="flex justify-between items-center font-medium">
        <span>{currentDay}</span>
        <span>{localTime}</span>
      </p>
      <p className="pt-2 flex gap-1 font-bold">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>
      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex gap-2">
          <span>최저기온: {minTemp}°</span>
          <span>최고기온: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
};

export default Temperature;
