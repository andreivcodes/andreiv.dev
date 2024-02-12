import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allProjects } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";

export default async function Blog() {
  return (
    <div className="w-full max-w-4xl flex flex-col p-4 gap-4">
      {allProjects
        .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())
        .map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            short={project.short}
            date={project.date}
            slug={project.slug}
          />
        ))}
    </div>
  );
}

const ProjectCard = ({
  name,
  short,
  date,
  slug,
}: {
  name: string;
  short: string;
  date: string;
  slug: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/projects/${slug}`}>{name}</Link>
        </CardTitle>
        <CardDescription>{short}</CardDescription>
      </CardHeader>

      <CardFooter className="w-full justify-end">
        <div className="text-xs font-thin font-mono text-stone-400">
          {format(parseISO(date), "LLLL d, yyyy")}
        </div>
      </CardFooter>
    </Card>
  );
};
