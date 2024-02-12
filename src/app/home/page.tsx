import { AboutShort } from "@/components/about-short";
import { Tweet } from "@/components/tweet/tweet";
import {
  Scraper,
  Tweet as ScrapedTweet,
} from "@the-convocation/twitter-scraper";

export const revalidate = 3600

export default async function Home() {
  let scraper = new Scraper();
  try { await scraper.login(process.env.TWITTER_ACCOUNT, process.env.TWITTER_PASSWORD, process.env.TWITTER_PASSWORD); } catch { }
  let tweet = await scraper.getLatestTweet("andreivtweets");

  return (
    <main className="flex w-full h-full flex-col items-center justify-evenly py-8 gap-4">
      <div className="flex flex-col gap-2">
        <AboutShort />

      </div>
      <Tweet id={(tweet as ScrapedTweet).id} />
    </main>
  );
}
