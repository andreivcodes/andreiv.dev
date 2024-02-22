"use client"

import { AboutLong } from "@/components/about/about-long";
import { Experiences } from "@/components/about/experience";
import { Projects } from "@/components/about/project";
import { Skills } from "@/components/about/skills";
import { useState } from "react";

export default function Home() {
  enum Page {
    Projects = 0,
    Experience
  };
  const [page, setPage] = useState(Page.Projects)

  return (
    <main className="flex w-full max-w-7xl h-full flex-col p-2 md:p-8 gap-12 md:gap-24">
      <div className="flex flex-col md:flex-row">
        <AboutLong />
        <Skills />
      </div>
      <div className="grid grid-flow-col auto-cols-auto gap-2 md:gap-8 transition-all duration-1000 lg:hidden">

        <div onClick={() => setPage(Page.Projects)}>
          <Projects hidden={page != Page.Projects} />
        </div>

        <div className="inset-y-0 bg-current w-px"></div>

        <div onClick={() => setPage(Page.Experience)}>
          <Experiences hidden={page != Page.Experience} />
        </div>
      </div>

      <div className="hidden lg:grid grid-flow-col auto-cols-auto gap-2 md:gap-8 transition-all duration-1000">
        <Projects hidden={false} />
        <div className="inset-y-0 bg-current w-px"></div>
        <Experiences hidden={false} />
      </div>

    </main >
  );
}
