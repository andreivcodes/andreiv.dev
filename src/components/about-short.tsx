import { GlobeIcon, WholeWordIcon } from "lucide-react";

export const AboutShort = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="font-mono font-bold text-3xl">Andrei Voinea</div>
        <div className="font-mono">Full Stack Engineer</div>
        <div className="flex flex-row items-center gap-2 font-mono font-light text-sm">
          <GlobeIcon className="h-4 w-4" />
          Sibiu, Romania, GMT+2
        </div>
      </div>
      <div className="flex flex-col">
        <div className="font-mono font-light text-sm">
          selectively dumb, overall smart
        </div>
      </div>
    </div>
  );
};
