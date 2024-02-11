import { HomeIcon } from "@radix-ui/react-icons"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { Separator } from "./ui/separator"

export const Header = () => {
  return <div className="w-full flex flex-row justify-between md:justify-around items-center py-4 font-mono px-4 bg-stone-100 dark:bg-stone-900">
    <div className="w-1/4 hidden md:flex flex-row justify-start">
      <Link href="/">
        andreiv&apos;s website
      </Link >
    </div>


    <div className="flex md:hidden items-center justify-center">
      <Link href="/">
        <HomeIcon className="h-6 w-6" />
      </Link>
    </div>


    <div className="h-8 flex flex-row items-center justify-center gap-4 md:gap-8">
      <Link href="/blog" className="hover:border-b-2 transition-all duration-300">blog</Link>
      <Separator orientation="vertical" />
      <Link href="/projects" className="hover:border-b-2 transition-all duration-300">projects</Link>
      <Separator orientation="vertical" />
      <Link href="/about" className="hover:border-b-2 transition-all duration-300">about</Link>
    </div>

    <div className="w-1/4 hidden md:flex flex-row justify-end">
      <ThemeToggle />
    </div>
  </div >
}
