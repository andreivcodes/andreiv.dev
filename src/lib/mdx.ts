"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

export async function getExperiences() {
  const experiencesDirectory = path.join(process.cwd(), "data/experience");
  const fileNames = fs.readdirSync(experiencesDirectory);

  const experiences = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(experiencesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const { content: mdxContent } = await compileMDX({
        source: content,
        options: { parseFrontmatter: true },
      });

      return {
        slug,
        index: data.index,
        content: mdxContent,
        ...data,
      };
    }),
  );

  return experiences;
}

export async function getProjects() {
  const projectsDirectory = path.join(process.cwd(), "data/projects");
  const fileNames = fs.readdirSync(projectsDirectory);

  const projects = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const { content: mdxContent } = await compileMDX({
        source: content,
        options: { parseFrontmatter: true },
      });

      return {
        slug,
        index: data.index,
        inAbout: data.inAbout,
        content: mdxContent,
        ...data,
      };
    }),
  );

  return projects;
}
