import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const lat = 37.568;
    const lon = 126.978;

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr`;

    const response = await axios.get(url);

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("Error fetching air quality data");
  }
}
