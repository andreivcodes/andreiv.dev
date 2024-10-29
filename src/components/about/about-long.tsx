import { GlobeIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/card";
import Image from "next/image";

export const AboutLong = () => {
  return (
    <Card className="shadow-none md:shadow-sm border-0 md:border flex flex-col gap-4 max-w-xl">
      <CardHeader className="flex flex-col">
        <div className="flex flex-row items-start w-full justify-between">
          <div className="flex flex-col justify-between h-full">
            <div className="font-mono font-bold text-3xl">Andrei Voinea</div>

            <div>
              <div className="font-mono">Software Engineer</div>
              <div className="flex flex-row items-center gap-2 font-mono font-light text-sm">
                <GlobeIcon className="h-4 w-4" />
                Sibiu, Romania, GMT+2
              </div>
            </div>
          </div>

          <div className="aspect-square w-24 relative rounded-full overflow-hidden">
            <Image
              src="/profile.jpeg"
              alt="Profile picture"
              fill={true}
              className="object-cover"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="font-mono text-sm">
        Ex-senior engineer at a leading tier 1 automotive supplier and failed
        startup cofounder, now exploring web technologies, web3, DAOs and
        building new things. Always curious about what's next.
      </CardContent>
    </Card>
  );
};
