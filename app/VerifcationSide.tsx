"use client";
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Shield } from "lucide-react";
import VerificationText from "./VerificationText";
import VerificationFiles from "./VerifcationFiles";

const VerifcationSide = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const pages = [
    {
      id: 1,
      content: <VerificationText />,
    },
    {
      id: 2,
      content: <VerificationFiles />,
    },
  ];

  const pageNum = pages[page]?.content;

  return (
    <div>
      <Card className="gap-5 py-5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-3 font-semibold">
            <Shield className="mt-1" />
            <h1>Content Verification</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div
            className={`flex w-full items-center  bg-[#F5F5F5] dark:bg-black font-semibold py-1.5 rounded-lg justify-evenly `}
          >
            <div
              onClick={() => setPage((page) => (page = 0))}
              className={`w-full text-center cursor-pointer mx-2 py-1 rounded-md ${
                page === 0 ? "bg-white dark:bg-stone-900" : ""
              } `}
            >
              <h1>Text</h1>
            </div>
            <div
              onClick={() => setPage((page) => (page = 1))}
              className={`w-full text-center cursor-pointer mx-2 py-1 rounded-md ${
                page === 1 ? "bg-white dark:bg-stone-900" : ""
              } `}
            >
              <h1>Files</h1>
            </div>
          </div>
          {pageNum}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifcationSide;
