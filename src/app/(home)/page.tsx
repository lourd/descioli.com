import Link from "next/link"

import { getStories } from "@/lib/get-stories"

export default async function HomePage() {
  const stories = await getStories()
  const latest = stories[0]

  return (
    <div className="flex flex-col justify-center h-full w-full max-w-[520px]">
      <div className="flex flex-col gap-2">
        <p className="text-5xl mb-2">Hi, {"I'm"} Louis</p>
        <p className="font-serif">But you can call me Lou, too.</p>
        <p className="font-serif">Welcome to my personal corner of the web.</p>
        <p className="font-serif">
          {"I'm"} the founder and CEO of Together, an AR communication company.
        </p>
        <p className="font-serif">
          <a
            href="https://forms.gle/fBFoxdTn9eypPYo49"
            className="transition-colors duration-200 text-link hocus:underline"
          >
            Sign up to beta test
          </a>{" "}
          and come along for the ride.
        </p>
        <p className="font-serif">Enjoy your time here 🖖</p>
      </div>
      <nav className="mt-8 flex flex-col gap-[5px]">
        <div>
          <Link
            href="/blog"
            className="block -ml-1 px-2 py-1 rounded text-link text-2xl md:text-3xl hocus:bg-muted transition-colors duration-200"
          >
            <span className="inline-block w-10">📰</span>
            <span>My blog</span>
          </Link>
          <p className="text-foregroundGray ml-[46px] leading-normal text-sm">
            Read my latest{" "}
            <span className="-scale-x-100 inline-block">{"👀"}</span>
            <Link
              href={latest.slug}
              className="hocus:bg-muted ml-1 px-1 py-[2px] font-bold italic text-link transition-colors duration-200 rounded-sm"
            >
              {latest.data.description}
            </Link>
          </p>
        </div>
        <div>
          <Link
            href="/bio"
            className="block -ml-1 px-2 py-1 rounded text-link text-2xl md:text-3xl hocus:bg-muted transition-colors duration-200"
          >
            <span className="inline-block w-10">🥸</span>
            <span>Who am I?</span>
          </Link>
          <p className="text-foregroundGray ml-[46px] leading-normal text-sm">
            A little about me
          </p>
        </div>
        <div>
          <Link
            href="/links"
            className="block -ml-1 px-2 py-1 rounded text-link text-2xl md:text-3xl hocus:bg-muted transition-colors duration-200"
          >
            <span className="inline-block w-10">🌐</span>
            <span>Where you can find me</span>
          </Link>
          <div className="text-foregroundGray ml-[46px] leading-normal text-sm">
            Virtually speaking
          </div>
        </div>
        <div>
          <Link
            href="/sketches"
            className="block -ml-1 px-2 py-1 rounded text-link text-2xl md:text-3xl hocus:bg-muted transition-colors duration-200"
          >
            <span className="inline-block w-10">📓</span>
            <span>Sketches</span>
          </Link>
          <p className="text-foregroundGray ml-[46px] leading-normal text-sm">
            Things I make for myself
          </p>
        </div>
        <div>
          <a
            href="https://github.com/lourd/descioli.com"
            className="block -ml-1 px-2 py-1 rounded text-link text-2xl md:text-3xl hocus:bg-muted transition-colors duration-200"
          >
            <span className="inline-block w-10">💿</span>
            <span>The source code</span>
          </a>
          <p className="text-foregroundGray ml-[46px] leading-normal text-sm">
            To this very website
          </p>
        </div>
      </nav>
    </div>
  )
}
