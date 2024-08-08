export const toCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const airQualityList = [
  {
    rating: 0,
    description: "좋음",
  },
  {
    rating: 10,
    description: "좋음",
  },
  {
    rating: 20,
    description: "좋음",
  },
  {
    rating: 30,
    description: "좋음",
  },
  {
    rating: 40,
    description: "보통",
  },
  {
    rating: 50,
    description: "보통",
  },
  {
    rating: 60,
    description: "나쁨",
  },
  {
    rating: 70,
    description: "나쁨",
  },
  {
    rating: 80,
    description: "나쁨",
  },
  {
    rating: 90,
    description: "매우나쁨",
  },
  {
    rating: 100,
    description: "매우나쁨",
  },
];
