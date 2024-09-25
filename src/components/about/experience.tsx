import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { MDXRemote } from "next-mdx-remote";
import { getExperiences } from "@/lib/mdx";

export const Experiences = ({ withTitle }: { withTitle: boolean }) => {
  const [experiences, setExperiences] = React.useState([]);

  React.useEffect(() => {
    async function loadExperiences() {
      const experienceData = await getExperiences();
      setExperiences(experienceData);
    }
    loadExperiences();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {withTitle && (
        <div className="text-2xl font-bold mb-4 text-center md:text-left">
          Experience
        </div>
      )}
      <div>
        {experiences
          .sort((a, b) => a.index - b.index)
          .map((experience) => (
            <ExperienceCard
              key={experience.slug}
              experience={experience}
              hidden={false}
            />
          ))}
      </div>
    </div>
  );
};

export const ExperienceCard = ({
  experience,
  hidden,
}: {
  experience: any;
  hidden: boolean;
}) => {
  if (hidden) return null;
  return (
    <div
      className={`w-full flex flex-col items-start gap-2 pt-${experience.aboutTopPadding ?? 0}`}
    >
      <div className="text-sm">
        {experience.startDate} -{" "}
        {experience.endDate ? experience.endDate : "now"}
      </div>
      <Separator className="-ml-2 md:-ml-8 w-32 bg-current" />
      <Card className="w-full shadow-none md:shadow-sm border-0 md:border">
        <CardHeader className="w-full p-2 md:p-6">
          <CardTitle className="w-full flex flex-col gap-2">
            <div className="w-full flex flex-row justify-between gap-2 align-bottom">
              <div className="font-semibold">{experience.companyName}</div>
              <div className="hidden md:block text-xs font-mono font-extralight">
                {experience.companyAbout}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-2">
              <div className="text-start text-lg">{experience.role}</div>
              <div className="justify-between font-light text-sm opacity-50">
                {experience.startDate} to{" "}
                {experience.endDate ? experience.endDate : "now"}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <MDXRemote {...experience.content} />
        </CardContent>
      </Card>
    </div>
  );
};
