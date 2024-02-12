import { AboutShort } from "@/components/about-short";
import { Tweet } from "@/components/tweet";
import { Separator } from "@/components/ui/separator";
import {
  Scraper,
  Tweet as ScrapedTweet,
} from "@the-convocation/twitter-scraper";

export default async function Home() {
  let scraper = new Scraper();

  await scraper.login("testaccoun78393", "testpassword", "testpassword");

  let tweet = await scraper.getLatestTweet("andreivtweets");
  return (
    <main className="flex w-full h-full flex-col items-center justify-evenly py-8 gap-4">
      <div className="flex flex-col gap-2">
        <AboutShort />
        <Separator className="max-w-2xl" />
      </div>
      <Tweet id={(tweet as ScrapedTweet).id} />
    </main>
  );
}
