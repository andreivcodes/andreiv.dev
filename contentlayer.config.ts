import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from 'remark-gfm'
import remarkBreaks from "remark-breaks"

export const BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the blog post",
      required: true,
    },
    short: {
      type: "string",
      description: "Short description",
      required: true,
    },
    date: {
      type: "string",
      description: "The date of the blog post",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    wordCount: {
      type: "number",
      resolve: (doc) => doc.body.raw.split(" ").length,
    },
  },
}));

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx",
  fields: {
    index: {
      type: "number",
      required: true,
    },
    aboutTopPadding: {
      type: "number",
      required: false
    },
    name: {
      type: "string",
      description: "The name of the project",
      required: true,
    },
    shortDescription: {
      type: "string",
      description: "A short description of the project",
      required: true,
    },
    date: {
      type: "string",
      description: "The date of the blog post",
      required: true,
    },
    url: {
      type: "string",
      required: false
    },
    repository: {
      type: "string",
      required: false
    },
    stackPrimary: {
      type: "list",
      of: { type: "string" },
      description: "Primary tech stack used",
      required: false,
    },
    stackSecondary: {
      type: "list",
      of: { type: "string" },
      description: "Secondary tech stack used",
      required: false,
    },
    images: {
      type: "list",
      of: { type: 'string' },
      description: "Screenshots of the project",
      required: false,
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

export const Experience = defineDocumentType(() => ({
  name: "Experience",
  filePathPattern: "experience/**/*.mdx",
  contentType: "mdx",
  fields: {
    aboutTopPadding: {
      type: "number",
      required: false
    },
    index: {
      type: "number",
      required: true,
    },
    companyName: {
      type: "string",
      description: "The name of the company",
      required: true,
    },
    companyAbout: {
      type: "string",
      description: "The name of the company",
      required: false,
    },
    role: {
      type: "string",
      description: "The name of the role",
      required: true,
    },
    startDate: {
      type: "string",
      description: "The start date",
      required: true,
    },
    endDate: {
      type: "string",
      description: "The end date",
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Project, BlogPost, Experience],
  mdx: {
    remarkPlugins: [remarkGfm],
  }
});
