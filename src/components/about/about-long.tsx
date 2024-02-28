import { GlobeIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/card";

export const AboutLong = () => {
  return (
    <Card className="shadow-none md:shadow-sm border-0 md:border flex flex-col gap-4 max-w-xl">
      <CardHeader className="flex flex-col">
        <div className="font-mono font-bold text-3xl">Andrei Voinea</div>
        <div className="font-mono">Software Engineer</div>
        <div className="flex flex-row items-center gap-2 font-mono font-light text-sm">
          <GlobeIcon className="h-4 w-4" />
          Sibiu, Romania, GMT+2
        </div>
      </CardHeader>
      <CardContent className="font-mono text-sm">
        Former senior engineer at a leading tier 1 automotive supplier and failed startup cofounder,
        now diving into the exciting world of web technologies, web3, and entrepreneurship.
      </CardContent>
    </Card>
  );
};
