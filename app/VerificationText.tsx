"use client";
import { useState } from "react";
import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VerificationResult } from "@/lib/api";
import { useResultStore } from "@/store/verification";

const VerificationText = () => {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setVerdict, setSources, setClaim, claim } = useResultStore();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await VerificationResult(claim);
      setVerdict(response?.verdict || "");
      setSources(response?.sources || []);
    } catch {
      console.log("Failed to submit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="gap-5 py-5">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <MessageSquare className="mt-1" />
            <h1 className="text-xl font-semibold">Claim Analysis</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            className="w-full p-2.5 outline rounded-md h-50"
            placeholder="Paste or type the news article, claim, or text you want to verify..."
          ></textarea>
          <Button
            onClick={handleSubmit}
            disabled={claim.length < 1 || isLoading}
            className="w-full py-5 cursor-pointer  my-4"
          >
            Analyze Text
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default VerificationText;
