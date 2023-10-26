import React from "react";
import ReadingSection from "@/components/readingSection";
import HeadSection from "@/components/headSection";

const Page: React.FC = () => {
  return (
    <main className="flex flex-col gap-8  py-4 bg-slate-50 h-screen mx-2  px-4 md:mx-24  md:px-8 	">
      <HeadSection />
      <ReadingSection />
    </main>
  );
};

export default Page;
