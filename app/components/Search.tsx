"use client";

import React from "react";
import { command } from "../utils/Icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";

const Search = () => {
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
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="주요지명으로 입력" />
            <ul className="px-3 pt-1 pb-2">
              <p className="p-2 text-sm text-muted-foreground">추천</p>
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Search;
