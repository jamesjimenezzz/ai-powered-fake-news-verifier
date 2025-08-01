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
import { ClaimData } from "@/lib/api";
import { ResultData } from "@/lib/types";

const VerificationText = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [verdict, setVerdict] = useState("");
  const [sources, setSources] = useState<string[]>([]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const postData = await ClaimData(query);
      setVerdict(postData.verdict);
      setSources(postData.sources);
    } catch {
      console.log("failed");
    } finally {
      setLoading(false);
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2.5 outline rounded-md h-50"
            placeholder="Paste or type the news article, claim, or text you want to verify..."
          ></textarea>
          <Button
            onClick={handleSubmit}
            disabled={query.length < 1}
            className="w-full py-5 cursor-pointer  my-4"
          >
            Analyze Text
          </Button>
        </CardContent>
      </Card>

      {!loading ? (
        <p>
          RESULT: {verdict} {sources}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default VerificationText;
