
import React from "react";
import { ShieldCheck } from "lucide-react";
import { ModeToggle } from "./Theme";

const Header = () => {
  return (
    <div className="w-full bg-white dark:bg-black border-b-1 border-gray-100 py-5">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex gap-5 items-center">
          <div className="outline rounded-md p-1.5 outline-gray-500">
            <ShieldCheck size={30} />
          </div>
          <div className="flex flex-col ">
            <h1 className="font-bold text-2xl">Behind The Claim</h1>
            <p className="text-muted-foreground">
              AI-powered fact checking and verification
            </p>
          </div>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
