import Navbar from "./components/Navbar";
import Temperature from "./components/Temperature";
import AirQuality from "./components/AirQuality";
import Sunset from "./components/Sunset";
import Wind from "./components/Wind";
import WeatherForecast from "./components/WeatherForecast";
import UvIndex from "./components/UvIndex";

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
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
          </div>
        </div>
      </div>
    </main>
  );
}
