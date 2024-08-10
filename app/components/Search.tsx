"use client";

import React from "react";
import { command } from "../utils/Icons";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "../context/globalContext";

const Search = () => {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border flex justify-center items-center text-sm hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200"
          >
            <p className="text-xs text-muted-foreground">검색하기</p>
            <div className="dark:bg-[#262626] bg-slate-200 py-[2px] pl-[5px] pr-[5px] rounded-sm ml-[6rem] md:ml-[10rem] ">
              {command}
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0">
          <DialogHeader>
            <DialogTitle>
              <VisuallyHidden.Root>Title</VisuallyHidden.Root>
            </DialogTitle>
            <DialogDescription>
              <VisuallyHidden.Root>Description</VisuallyHidden.Root>
            </DialogDescription>
          </DialogHeader>
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              value={inputValue}
              onChangeCapture={handleInput}
              placeholder="주요지명으로 입력"
            />
            <ul className="px-3 pt-1 pb-2">
              <p className="p-2 text-sm text-muted-foreground">추천</p>
              {geoCodedList?.length === 0 ? (
                <p>검색 결과가 없습니다.</p>
              ) : (
                geoCodedList.map(
                  (
                    item: {
                      name: string;
                      state: string;
                      country: string;
                      lat: number;
                      lon: number;
                    },
                    index: number
                  ) => {
                    const { country, state, name } = item;
                    return (
                      <li
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={`py-3 px-2 text-sm rounded-sm cursor-default ${
                          hoveredIndex === index ? "bg-accent" : ""
                        }`}
                        onClick={() => getClickedCoords(item.lat, item.lon)}
                      >
                        <p>
                          {name}, {state ? state + "," : ""} {country}
                        </p>
                      </li>
                    );
                  }
                )
              )}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Search;
