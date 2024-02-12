import { type EnrichedTweet } from "react-tweet";
import { nFormatter } from "./utils";
import { Heart, Message } from "./icons";
import { TweetHeader } from "./tweet-header";
import { TweetText } from "./tweet-text";
import { TweetMedia } from "./tweet-media";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export const DubTweet = ({ tweet }: { tweet: EnrichedTweet }) => {
  const TweetBody = (
    <div className="max-w-2xl px-4">
      <Card>
        <CardHeader className="py-4">
          {/* User info, verified badge, twitter logo, text, etc. */}
          <div>
            <TweetHeader tweet={tweet} />
            {tweet.in_reply_to_status_id_str &&
              tweet.in_reply_to_screen_name && (
                <div className="mt-5 text-base text-gray-500">
                  Replying to{" "}
                  <a
                    className="text-[#1da1f2] no-underline"
                    href={tweet.in_reply_to_url}
                    target="_blank"
                  >
                    @{tweet.in_reply_to_screen_name}
                  </a>
                </div>
              )}
          </div>
        </CardHeader>
        <CardContent className="py-4">
          <TweetText tweet={tweet} />
          {/* Images, Preview images, videos, polls, etc. */}
          <div className="-mb-2 mt-3">
            {tweet.mediaDetails?.length ? (
              <div
                className={
                  tweet.mediaDetails.length === 1
                    ? ""
                    : "inline-grid grid-cols-2 gap-x-2 gap-y-2"
                }
              >
                {tweet.mediaDetails?.map((media) => (
                  <a
                    key={media.media_url_https}
                    href={tweet.url}
                    target="_blank"
                  >
                    <TweetMedia tweet={tweet} media={media} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="py-4">
          <div className="flex justify-center space-x-8 text-sm">
            <a
              className="group flex items-center space-x-3 hover:text-red-800"
              href={tweet.like_url}
              target="_blank"
              rel="noreferrer"
            >
              <Heart className="h-4 w-4 group-hover:fill-red-800" />
              <p>{nFormatter(tweet.favorite_count)}</p>
            </a>
            <a
              className="group flex items-center space-x-3 hover:text-blue-800"
              href={tweet.reply_url}
              target="_blank"
              rel="noreferrer"
            >
              <Message className="h-4 w-4 group-hover:fill-blue-800" />
              <p>{nFormatter(tweet.conversation_count)}</p>
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );

  return TweetBody;
};
