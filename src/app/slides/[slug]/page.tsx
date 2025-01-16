import { getPresentation } from "@/lib/mdx";
import { Presentation } from "./presentation";

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const presentation = await getPresentation(slug);

  return <Presentation presentation={presentation} />;
}
