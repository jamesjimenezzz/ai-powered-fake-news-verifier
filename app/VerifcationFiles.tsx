"use client";
import { useRef, useState } from "react";
import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import { FileText } from "lucide-react";
import Image from "next/image";
import pdfIcon from "@/public/pdficon.webp";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VerificationResultFile } from "@/lib/api";
import { useResultStore } from "@/store/verification";

const VerificationFiles = () => {
  const [query, setQuery] = useState<string>("");
  const [pdfName, setPdfName] = useState("");
  const [fileSubmit, setFileSubmit] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const {
    setVerdict,
    setSources,
    fileName,
    setFileName,
    isLoading,
    setIsLoading,
  } = useResultStore();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setImagePreview(URL.createObjectURL(file));
      setFileSubmit(file);
    }
  };

  const handleRemove = () => {
    setFileName("");
    setImagePreview("");
    setPdfName("");
    setFileSubmit(null);
  };

  const handlePdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
      setPdfName(file.name);
      setFileSubmit(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await VerificationResultFile(fileSubmit!);
      setVerdict(response.verdict);
      setSources(response.sources);
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
          {imagePreview || pdfName ? (
            <>
              <div
                className={`flex justify-center items-center ${
                  pdfName ? "gap-3 bg-gray-100 py-5 px-5" : ""
                }`}
              >
                <Image
                  className={pdfName ? "w-10 h-auto" : ""}
                  width={300}
                  height={300}
                  alt="image"
                  src={imagePreview || pdfIcon}
                />
                {pdfName && <p className="font-semibold text-lg">{pdfName}</p>}
              </div>
            </>
          ) : (
            <div className="w-full p-2.5 outline rounded-md h-50 outline-none border-dotted border-gray-200 border-3">
              <div className="flex flex-col gap-2 items-center justify-center h-full">
                <Upload size={30} className="text-muted-foreground" />
                <p className=" text-muted-foreground">
                  Drag and drop files here, or click to upload
                </p>
                <div className="flex  gap-5">
                  <Button
                    onClick={() => imageInputRef.current?.click()}
                    className="cursor-pointer"
                    variant={"outline"}
                  >
                    <ImageIcon /> <p>Upload Image</p>
                  </Button>
                  <Button
                    onClick={() => pdfInputRef.current?.click()}
                    className="cursor-pointer"
                    variant={"outline"}
                  >
                    <FileText /> <p>Upload PDF</p>
                  </Button>
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handlePdf}
                />
              </div>
            </div>
          )}
          <div className="flex w-full gap-5 ">
            <Button
              variant={"destructive"}
              onClick={handleRemove}
              disabled={fileName.length == 0}
              className=" py-5 cursor-pointer flex-1  my-4"
            >
              Remove
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={fileName.length == 0}
              className=" py-5 cursor-pointer flex-1/2  my-4"
            >
              Analyze Text
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default VerificationFiles;
