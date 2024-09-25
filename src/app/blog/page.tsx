import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import Link from "next/link";

export default async function Blog() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="w-full max-w-4xl flex flex-col p-4 gap-4">
      {blogPosts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((post) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            date={post.date}
            short={post.short}
            slug={post.slug}
            wordCount={post.wordCount}
          />
        ))}
    </div>
  );
}

const BlogCard = ({
  title,
  date,
  short,
  slug,
  wordCount,
}: {
  title: string;
  date: string;
  short: string;
  slug: string;
  wordCount: number;
}) => {
  const formattedDate = formatDate(date);

  return (
    <Card>
      <Link href={`/blog/${slug}`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{short}</CardDescription>
        </CardHeader>

        <CardFooter className="w-full justify-end">
          <div className="text-xs font-thin font-mono text-stone-400">
            {formattedDate} - {wordCount} words
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

async function getBlogPosts() {
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
