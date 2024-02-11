import { GitPullRequestArrow, GithubIcon, LinkedinIcon, XIcon } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
  return <div className="w-full flex flex-row justify-between items-center py-4 font-mono px-4 bg-stone-100 dark:bg-stone-900 bottom-0 absolute">
    <div className="flex flex-row text-sm">
      keep building in the open
    </div>
    <div className="flex flex-row gap-8">
      <Link href="https://github.com/andreivcodes" target="_blank"><GithubIcon /></Link>
      <Link href="https://x.com/andreivtweets" target="_blank"><XIcon /></Link>
      <Link href="https://linkedin.com/in/andreivcodes" target="_blank"><LinkedinIcon /></Link>
    </div>
  </div >
}
