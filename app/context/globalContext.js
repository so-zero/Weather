"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});

  const fetchForecast = async () => {
    try {
      const response = await axios.get("api/weather");

      setForecast(response.data);
    } catch (error) {
      console.log("Error fetching weather forecast data", error);
    }
  };

  const FetchAirQuality = async () => {
    try {
      const response = await axios.get("api/cai");

      setAirQuality(response.data);
    } catch (error) {
      console.log("Error fetching air quality data", error);
    }
  };

  const FetchFiveDayForecast = async () => {
    try {
      const response = await axios.get("api/fiveday");

      setFiveDayForecast(response.data);
    } catch (error) {
      console.log("Error fetching daily weather data", error);
    }
  };

  useEffect(() => {
    fetchForecast();
    FetchAirQuality();
    FetchFiveDayForecast();
  }, []);

  return (
    <GlobalContext.Provider value={{ forecast, airQuality, fiveDayForecast }}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
