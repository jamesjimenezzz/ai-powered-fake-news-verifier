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

const VerifcationSide = () => {
  const [query, setQuery] = useState<string>("");

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
          <div className="flex w-full items-center bg-[#F5F5F5] dark:bg-black font-semibold py-1.5 rounded-lg justify-evenly">
            <div className="w-full text-center bg-white dark:bg-stone-900 mx-2 py-1 rounded-md ">
              <h1>Text</h1>
            </div>
            <div className="w-full mx-2 py-1 rounded-md text-center">
              <h1>Files</h1>
            </div>
          </div>
          <Card className="gap-5 py-5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageSquare className="mt-1" />
                <h1 className="text-xl font-semibold">Text Analysis</h1>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2.5 outline rounded-md h-50"
                placeholder="Paste or type the news article, claim, or text you want to verify..."
              ></textarea>
              <Button
                disabled={query.length < 1}
                className="w-full py-5 cursor-pointer  my-4"
              >
                Analyze Text
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifcationSide;
