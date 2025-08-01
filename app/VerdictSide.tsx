"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useResultStore } from "@/store/verification";
import { CircleX } from "lucide-react";

import { BookOpenCheck } from "lucide-react";
import Link from "next/link";
import { CircleCheckBig } from "lucide-react";
import Spinner from "@/components/Spinner";

const VerdictSide = () => {
  const { verdict, sources, claim, isLoading, fileName } = useResultStore();
  const isTrue = verdict.toLowerCase().includes("true");
  const isFalse = verdict.toLowerCase().includes("false");
  const isUnknown = verdict.toLowerCase().includes("unknown");

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Verification Result
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-1.5 items-center h-full pb-10 justify-center">
        {isLoading ? (
          <>
            <Spinner />
            <h1 className="text-lg font-medium text-muted-foreground">
              Analyzing...
            </h1>
          </>
        ) : !verdict || !sources ? (
          <>
            <div className="rounded-full p-5 bg-gray-100">
              <BookOpenCheck className="text-gray-500" size={40} />
            </div>
            <h1 className="text-xl font-semibold">No Analysis Yet</h1>
            <p className="text-muted-foreground">
              Submit text, images, or PDFs to see verification results here.
            </p>
          </>
        ) : (
          <>
            <Card>
              <CardContent className="flex flex-col gap-4">
                {isTrue && (
                  <div className="flex items-center gap-3">
                    <CircleCheckBig size={20} className="text-green-600" />
                    <p className="rounded-md text-sm text-green-700 px-4 font-[500] bg-green-200 outline outline-green-300">
                      The Claim is True
                    </p>
                  </div>
                )}
                {isFalse && (
                  <div className="flex items-center gap-3">
                    <CircleX size={20} className="text-red-600" />
                    <p className="rounded-md text-sm text-red-700 px-4 font-[500] bg-red-200 outline outline-red-300">
                      The Claim is False
                    </p>
                  </div>
                )}
                <p className="font-semibold ">
                  {claim} {fileName}
                </p>
                <p>{verdict}</p>
                <div>
                  {sources.map((source) => (
                    <div
                      key={source}
                      className="my-4 p-2 bg-gray-100 rounded-md"
                    >
                      <Link
                        className="underline font-semibold text-sm text-gray-800"
                        href={source}
                        target="_blank"
                      >
                        {source}
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VerdictSide;
