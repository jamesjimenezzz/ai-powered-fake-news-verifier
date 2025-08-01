import { HelloWorld } from "@/lib/api";
import React from "react";

const Footer = async () => {
  const hello = await HelloWorld();

  return (
    <div className="max-w-[1400px] mx-auto flex justify-between">
      <div className="flex flex-col gap-2 ">
        <h1>How it Works {hello ? hello.message : ""}</h1>
        <div className="flex flex-col gap-2">
          <li>
            <span className="text-muted-foreground">
              Paste text or upload images/PDFs to analyze
            </span>
          </li>
          <li>
            <span className="text-muted-foreground">
              AI cross-references content with reliable sources
            </span>
          </li>
          <li>
            <span className="text-muted-foreground">
              Review detailed analysis and source information
            </span>
          </li>
        </div>
      </div>

      <div className="self-end">
        <p className="font-semibold">james jimenez @'25</p>
      </div>
    </div>
  );
};

export default Footer;
