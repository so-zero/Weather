"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});

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

  useEffect(() => {
    fetchForecast();
    FetchAirQuality();
  }, []);

  return (
    <GlobalContext.Provider value={{ forecast, airQuality }}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
