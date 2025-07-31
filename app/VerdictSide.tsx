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
import { BookOpenCheck } from "lucide-react";

const VerdictSide = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Verification Result
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-1.5 items-center h-full pb-10  justify-center">
        <div className="rounded-full p-5 bg-gray-100">
          <BookOpenCheck className="text-gray-500" size={40} />
        </div>
        <h1 className="text-xl font-semibold">No Analysis Yet</h1>
        <p className="text-muted-foreground">
          Submit text, images, or PDFs to see verification results here.
        </p>
      </CardContent>
    </Card>
  );
};

export default VerdictSide;
