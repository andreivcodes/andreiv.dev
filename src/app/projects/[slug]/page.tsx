import { format, parseISO } from "date-fns";
import { allProjects } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

export const generateMetadata = ({ params }) => {
  const project = allProjects.find((project) => project.slug === params.slug);
  return { name: project.name };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const project = allProjects.find((project) => project.slug === params.slug);

  const Content = getMDXComponent(project.body.code);

  return (
    <article className="w-full max-w-4xl flex flex-col p-4 gap-4">
      <div className="mb-8">
        <time dateTime={project.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(project.date), "LLLL d, yyyy")}
        </time>
        <h1 className="font-mono text-3xl">{project.name}</h1>
      </div>
      <Content />
    </article>
  );
};

export default PostLayout;
