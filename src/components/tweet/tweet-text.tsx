import { type ReactNode } from "react";
import { type EnrichedTweet } from "react-tweet";
import Link from "next/link"
const Url = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    className="text-[rgb(29,161,242)] font-normal no-underline"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </Link>
);

export const TweetText = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="truncate whitespace-pre-wrap text-sm">
    {tweet.entities.map((item, i) => {
      switch (item.type) {
        case "hashtag":
        case "mention":
        case "url":
        case "symbol":
          return (
            <Url key={i} href={item.href}>
              {item.text}
            </Url>
          );
        case "media":
          return;
        default:
          // We use `dangerouslySetInnerHTML` to preserve the text encoding.
          // https://github.com/vercel-labs/react-tweet/issues/29
          return (
            <span key={i} dangerouslySetInnerHTML={{ __html: item.text }} />
          );
      }
    })}
  </div>
);
