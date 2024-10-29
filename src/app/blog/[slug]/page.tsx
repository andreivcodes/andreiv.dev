import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import { getBlogPost } from "@/lib/mdx";

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug);
  return { title: post.title };
}

const PostLayout = async ({ params }: { params: { slug: string } }) => {
  const post = await getBlogPost(params.slug);

  return (
    <article className="w-full max-w-4xl flex flex-col p-4 gap-4">
      <div className="mb-8">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(new Date(post.date), "LLLL d, yyyy")}
        </time>
        <h1 className="font-mono text-3xl">{post.title}</h1>
      </div>
      <MDXRemote
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkParse],
            rehypePlugins: [rehypeStringify, rehypePrism],
          },
        }}
      />
    </article>
  );
};

export default PostLayout;
