import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { getPresentations } from "@/lib/mdx";

export default async function Presentations() {
  const presentations = await getPresentations();

  return (
    <div className="w-full max-w-4xl flex flex-col p-4 gap-4">
      {presentations
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((presentation) => (
          <PresentationCard
            key={presentation.slug}
            title={presentation.title}
            date={presentation.date}
            short={presentation.short}
            slug={presentation.slug}
          />
        ))}
    </div>
  );
}

const PresentationCard = ({
  title,
  date,
  short,
  slug,
}: {
  title: string;
  date: string;
  short: string;
  slug: string;
}) => {
  const formattedDate = formatDate(date);

  return (
    <Card>
      <Link href={`/slides/${slug}`}>
        <CardHeader>
          <CardTitle className="self-center">{title}</CardTitle>
          <CardDescription>{short}</CardDescription>
        </CardHeader>

        <CardFooter className="w-full justify-end">
          <div className="text-xs font-thin font-mono text-stone-400">
            {formattedDate}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return format(date, "LLLL d, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return the original string if parsing fails
  }
}
