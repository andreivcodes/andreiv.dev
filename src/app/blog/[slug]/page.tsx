import { format, parseISO } from "date-fns";
import { allBlogPosts } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

export const generateMetadata = ({ params }) => {
  const post = allBlogPosts.find((post) => post.slug === params.slug);
  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allBlogPosts.find((post) => post.slug === params.slug);

  const Content = getMDXComponent(post.body.code);

  return (
    <article className="w-full max-w-4xl flex flex-col p-4 gap-4">
      <div className="mb-8">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1 className="font-mono text-3xl">{post.title}</h1>
      </div>
      <Content />
    </article>
  );
};

export default PostLayout;
