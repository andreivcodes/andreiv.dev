"use client";

import { useState, useEffect } from "react";
import { GlobeIcon } from "lucide-react";
import { TypewriterEffect } from "./ui/typewriter-effect";

const taglines = [
  [
    { text: "selectively" },
    { text: "dumb," },
    { text: "overall" },
    { text: "smart" },
  ],
  [{ text: "unironically" }, { text: "likes" }, { text: "crypto" }],
  [
    { text: "broke" },
    { text: "prod" },
    { text: "on" },
    { text: "Christmas" },
    { text: "Eve" },
  ],
  [{ text: "made" }, { text: "cars" }, { text: "go" }, { text: "vroom" }],
  [
    { text: "codes" },
    { text: "solutions" },
    { text: "looking" },
    { text: "for" },
    { text: "problems" },
  ],
  [
    { text: "in" },
    { text: "a" },
    { text: "world" },
    { text: "of" },
    { text: "talkers," },
    { text: "be" },
    { text: "a" },
    { text: "thinker" },
    { text: "and" },
    { text: "a" },
    { text: "doer" },
  ],
];

export const AboutShort = () => {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) =>
        prevIndex === taglines.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [currentTaglineIndex]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="font-mono font-bold text-3xl">Andrei Voinea</div>
        <div className="font-mono">Software Engineer</div>
        <div className="flex flex-row items-center gap-2 font-mono font-light text-sm">
          <GlobeIcon className="h-4 w-4" />
          Sibiu, Romania, GMT+2
        </div>
      </div>
      <div className="absolute flex flex-col pt-28 max-w-64">
        <TypewriterEffect
          key={currentTaglineIndex}
          words={taglines[currentTaglineIndex]}
          className="font-mono font-light text-sm text-left overflow-auto"
        />
      </div>
    </div>
  );
};
