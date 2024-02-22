import { Experience, allExperiences } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";


export const Experiences = ({ hidden }: { hidden: boolean }) => {
  if (hidden)
    return (<div className="flex flex-col">
      <div className="text-xl font-bold my-8 rotate-90" > Experience</div>
    </div>)
  else
    return (<div className="flex flex-col gap-8">
      <div className="text-2xl font-bold mb-4 text-center md:text-left" >Experience</div>
      <div>
        {allExperiences.sort((a, b) => a.index - b.index).map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} hidden={false} />
        ))}
      </div>
    </div>)
};

export const ExperienceCard = ({ experience, hidden }: { experience: Experience, hidden: boolean }) => {
  const Content = getMDXComponent(experience.body.code);
  if (hidden)
    return <></>
  else
    return (
      <div className={`w-full flex flex-col items-start gap-2 pt-${experience.aboutTopPadding ?? 0}`}>
        <div className="text-sm">
          {experience.endDate ? experience.endDate : "now"}
        </div>
        <Separator className="-ml-2 md:-ml-8 w-32 bg-current" />
        <Card className="w-full shadow-none md:shadow-sm border-0 md:border">
          <CardHeader className="w-full p-2 md:p-6">
            <CardTitle className="w-full flex flex-col gap-2">

              <div className="w-full flex flex-row justify-between gap-2 align-bottom">
                <div className="font-semibold">{experience.companyName}</div>
                <div className="hidden md:block text-xs font-mono font-extralight">{experience.companyAbout}</div>
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-2">
                <div className="text-start text-lg">
                  {experience.role}
                </div>
                <div className="justify-between font-light text-sm opacity-50">
                  {experience.startDate} to {experience.endDate ? experience.endDate : "now"}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <Content />
          </CardContent>

        </Card>
      </div >
    );
};
