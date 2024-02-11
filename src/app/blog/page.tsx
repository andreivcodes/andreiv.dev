import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { allBlogPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";

export default async function Blog() {
  return (
    <div className="w-full max-w-3xl py-8">
      {
        allBlogPosts.map((post) => <BlogCard key={post.short} title={post.title} date={post.date} short={post.short} slug={post.slug} wordCount={post.wordCount} />
        )
      }
    </div >
  )
}

const BlogCard = ({ title, date, short, slug, wordCount }: { title: string, date: string, short: string, slug: string, wordCount: string }) => {
  return (

    <Card>

      <CardContent>
        <CardHeader>
          <CardTitle>
            <Link href={`/blog/${slug}`} >{title}</Link>
          </CardTitle>
          <CardDescription>{short}</CardDescription>
        </CardHeader>
        <CardFooter className="w-full justify-end">
          <div className="text-xs font-thin font-mono text-stone-400">{format(parseISO(date), 'LLLL d, yyyy')} - {wordCount} words</div>
        </CardFooter>
      </CardContent>

    </Card>
  )
}
