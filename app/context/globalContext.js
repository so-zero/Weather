"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import defaultStates from "../utils/defaultStates";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");
  const [activeCityCoords, setActiveCityCoords] = useState([37.568, 126.978]);

  const fetchForecast = async (lat, lon) => {
    try {
      const response = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);

      setForecast(response.data);
    } catch (error) {
      console.log("Error fetching weather forecast data", error);
    }
  };

  const FetchAirQuality = async (lat, lon) => {
    try {
      const response = await axios.get(`/api/cai?lat=${lat}&lon=${lon}`);

      setAirQuality(response.data);
    } catch (error) {
      console.log("Error fetching air quality data", error);
    }
  };

  const FetchFiveDayForecast = async (lat, lon) => {
    try {
      const response = await axios.get(`/api/fiveday?lat=${lat}&lon=${lon}`);

      setFiveDayForecast(response.data);
    } catch (error) {
      console.log("Error fetching daily weather data", error);
    }
  };

  const FetchUvIndex = async (lat, lon) => {
    try {
      const response = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);

      setUvIndex(response.data);
    } catch (error) {
      console.log("Error fetching uv data", error);
    }
  };

  const FetchGeoCodedList = async (search) => {
    try {
      const response = await axios.get(`/api/geocoded?search=${search}`);

      setGeoCodedList(response.data);
    } catch (error) {
      console.log("Error fetching geocoded data");
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      FetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    FetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    FetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    FetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
