import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateMetadata({ params }) {
  const project = await getProject(params.slug);
  return { title: project.name };
}

const ProjectLayout = async ({ params }: { params: { slug: string } }) => {
  const project = await getProject(params.slug);

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

async function getProject(slug: string) {
  const projectsDirectory = path.join(process.cwd(), "data/projects");
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    name: data.name,
    date: data.date,
    content: content,
  };
}

export default ProjectLayout;
