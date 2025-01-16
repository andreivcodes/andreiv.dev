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
        startDate: data.startDate,
        endDate: data.endDate,
        companyName: data.companyName,
        companyAbout: data.companyAbout,
        role: data.role,
        aboutTopPadding: data.aboutTopPadding,
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

      return {
        slug,
        date: data.date,
        name: data.name,
        shortDescription: data.shortDescription,
        index: data.index,
        inAbout: data.inAbout,
        url: data.url,
        demoUrl: data.demoUrl,
        content: content,
        aboutTopPadding: data.aboutTopPadding,
        stackPrimary: data.stackPrimary,
        stackSecondary: data.stackSecondary,
        ...data,
      };
    }),
  );

  return projects;
}

export async function getProject(slug: string) {
  const projectsDirectory = path.join(process.cwd(), "data/projects");
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    date: data.date,
    name: data.name,
    shortDescription: data.shortDescription,
    index: data.index,
    inAbout: data.inAbout,
    url: data.url,
    demoUrl: data.demoUrl,
    content: content,
    aboutTopPadding: data.aboutTopPadding,
    stackPrimary: data.stackPrimary,
    stackSecondary: data.stackSecondary,
    ...data,
  };
}

export async function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), "data/blog");
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      short: data.short,
      wordCount: content.split(/\s+/).length,
    };
  });

  return posts;
}

export async function getBlogPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), "data/blog");
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    content: content,
  };
}

export async function getPresentations() {
  const presentationsDirectory = path.join(process.cwd(), "data/slides");
  const filenames = fs.readdirSync(presentationsDirectory);

  const presentations = filenames.map((filename) => {
    const filePath = path.join(presentationsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.mdx$/, ""),
      ...data,
      title: data.title,
      date: data.date,
      short: data.short,
    };
  });

  return presentations;
}

export async function getPresentation(slug: string) {
  const filePath = path.join(process.cwd(), "data/slides", `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    short: data.short,
    content,
  };
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;

export type ProjectsType = AsyncReturnType<typeof getProjects>;
export type ExperiencesType = AsyncReturnType<typeof getExperiences>;
export type BlogPostsType = AsyncReturnType<typeof getBlogPosts>;
export type ProjectType = AsyncReturnType<typeof getProject>;
export type ExperienceType = AsyncReturnType<typeof getExperiences>[0];
export type BlogPostType = AsyncReturnType<typeof getBlogPost>;
export type PresentationType = AsyncReturnType<typeof getPresentation>;
