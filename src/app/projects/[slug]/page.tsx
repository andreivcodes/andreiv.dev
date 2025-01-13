import { MDXRemote } from "next-mdx-remote/rsc";
import { getProject } from "@/lib/mdx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  return { title: project.name };
}

const ProjectLayout = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const project = await getProject(slug);

  return (
    <article className="w-full max-w-4xl flex flex-col p-4 gap-4">
      <div className="mb-8">
        <time dateTime={project.date} className="mb-1 text-xs text-gray-600">
          {project.date}
        </time>
        <h1 className="font-mono text-3xl">{project.name}</h1>
      </div>
      <MDXRemote source={project.content} />
    </article>
  );
};

export default ProjectLayout;
