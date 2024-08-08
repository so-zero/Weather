import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const lat = 37.568;
    const lon = 126.978;

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr`;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    const weatherData = await response.json();

    return NextResponse.json(weatherData);
  } catch (error) {
    console.log("Error fetching daily weather data");
  }
}
