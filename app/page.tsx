import Navbar from "./components/Navbar";
import Temperature from "./components/Temperature";
import AirQuality from "./components/AirQuality";
import Sunset from "./components/Sunset";
import Wind from "./components/Wind";
import WeatherForecast from "./components/WeatherForecast";
import UvIndex from "./components/UvIndex";
import Population from "./components/Population";
import FeelsLike from "./components/FeelsLike";
import Humidity from "./components/Humidity";
import Visibility from "./components/Visibility";
import Pressure from "./components/Pressure";
import Mapbox from "./components/Mapbox";
import defaultStates from "./utils/defaultStates";

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto mb-3">
      <Navbar />
      <div className="pt-7 pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
        </div>
        <div className="flex flex-col w-full">
          <div className="grid col-span-full h-full gap-4 sm-size:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirQuality />
            <Sunset />
            <Wind />
            <WeatherForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mt-4 flex gap-4">
            <Mapbox />
            <div className="flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gpa-2 font-medium">
                추천 도시맵
              </h2>
              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-lg cursor-pointer dark:bg-dark-gray shadow-sm dark:shadow-none"
                    >
                      <p className="px-6 py-4">{state.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
