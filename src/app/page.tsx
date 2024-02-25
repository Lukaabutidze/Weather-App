"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<JSX.Element | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus to be on input field

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // To search Location with Enter key

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getWeather();
    }
  };

  const getWeather = async () => {
    const api_key = "53d47eb8c0f34a5387c144317242302";
    const api_url =
      "http://api.weatherapi.com/v1/current.json?key=" +
      api_key +
      "&q=" +
      location;

    if (location) {
      try {
        const res = await fetch(api_url);
        const data = await res.json();

        if (data.error) {
          setWeather(<h1>Please type an existing location...</h1>);
        } else {
          const api_data = {
            country: data.location.country,
            city: data.location.name,
            temp: data.current.temp_c,
            humidity: data.current.humidity,
            wind: data.current.wind_kph,
            gust: data.current.gust_kph,
            visibility: data.current.vis_km,
            condition: data.current.condition.text,
            img: data.current.condition.icon,
            date: data.location.localtime,
          };

          setWeather(
            <>
              <div className="text-center text-2xl p-1  font-bold">
                {api_data.city}
              </div>
              <div className="flex justify-center">
                <div className="flow-root">
                  <div className="float-left">
                    <img
                      src={api_data.img}
                      width="90"
                      alt="Condition"
                      className="opacity-90"
                    />
                  </div>
                  <div className="float-left text-6xl text-sky-600 font-semibold degrees mt-4 opacity-85">
                    {api_data.temp}
                  </div>
                </div>
              </div>
              <div className="text-center text-gray-600">
                {api_data.condition}
              </div>
              <div className="flow-root p-2 mt-4">
                <div className="float-left text-gray-600 ">
                  Humidity: {api_data.humidity} %
                </div>
                <div className="float-right text-gray-600 ">
                  Wind: {api_data.wind} Kph{" "}
                </div>
                <div className="float-left text-gray-600 ">
                  Visibility: {api_data.visibility} km{" "}
                </div>
                <div className="float-right text-gray-600 ">
                  Gust: {api_data.gust} Kph
                </div>
              </div>
              <div className="mt-9 p-1 ml-auto float-end text-xs text-gray-800 font-bold">
                Local Time: {api_data.date}
              </div>
            </>
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //
    }
  };

  return (
    <>
      <nav className="flex items-center justify-center py-4 bg-transparent w-full m-0 opacity-90">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />{" "}
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
            </svg>
          </div>
          <input
            className="block bg-white text-black rounded-lg opacity-70 pl-10 p-3 placeholder:font-bold capitalize w-full"
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search For Location..."
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-900 text-white font-bold m-2 p-5 rounded-lg"
          id="search"
          onClick={getWeather}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </nav>
      {weather && (
        <div className="flex w-full p-20 justify-center">
          <div className="w-full max-w-xs">
            <div className="mb-5">
              <div className="bg-white shadow-xl rounded-3xl px-8 pt-6 mb-4 opacity-90 min-h-[330px]  mt-8 py-4">
                {weather}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
