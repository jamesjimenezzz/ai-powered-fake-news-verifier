import React from "react";
import VerifcationSide from "./VerifcationSide";
import VerdictSide from "./VerdictSide";
import Footer from "@/components/Footer";

const Content = () => {
  return (
    <div className="max-w-[1400px] mx-auto grid grid-cols-2 gap-20 py-15">
      <VerifcationSide />
      <VerdictSide />
    </div>
  );
};

export default Content;
