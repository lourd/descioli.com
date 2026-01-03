import { utc } from "@date-fns/utc"
import { format } from "date-fns"
import { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote-client/rsc"
import Image from "next/image"
import Link from "next/link"
import { ViewTransition } from "react"
import remarkGfm from "remark-gfm"

import { BackLinkWithHand } from "@/components/back-link"
import { Image as MyImage } from "@/components/image"
import { Poem } from "@/components/poem"
import { Video } from "@/components/video"
import { YouTube } from "@/components/youtube"
import { getSlugs, getStory } from "@/lib/get-stories"
import { slugify } from "@/lib/slugify"

import classes from "./classes.module.css"

export function generateStaticParams(): Array<{ slug: string }> {
  return getSlugs()
}

export async function generateMetadata({ params }: PageProps<"/[slug]">) {
  const { slug } = await params
  const story = getStory(slug)
  if (story instanceof Error) {
    console.error(story)
    return
  }
  return {
    title: story.data.title,
    description: story.data.description,
  } satisfies Metadata
}

export default async function StoryPage({ params }: PageProps<"/[slug]">) {
  "use cache"
  const story = getStory((await params).slug)

  return (
    <article className="max-md:mt-12">
      <ViewTransition name={story.slug}>
        <div className="relative">
          <Image
            alt=""
            className="min-h-[50vh] aspect-5/2 max-h-[700px] w-full object-cover object-center"
            src={story.data.header || story.data.image}
            priority
            //   FIXME
            width={1200}
            height={1200}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 z-1 flex flex-row justify-start items-end text-white bg-linear-to-b via-66% via-transparent to-black/70">
            <div className="max-w-[600px] grow p-6 mx-auto text-shadow-md shadow-black/70">
              <h1 className="text-5xl md:text-[4rem] font-bold leading-[1.1]">
                {story.data.title}
              </h1>
              <h2 className="text-3xl font-light text-balance">
                {story.data.description}
              </h2>
              <p className="mt-2 whitespace-pre text-sm">
                <a
                  href={story.lastEditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Published
                </a>{" "}
                <time>
                  {format(story.data.publication, "eeee, LLLL do, yyyy", {
                    in: utc,
                  })}
                </time>
              </p>
            </div>
          </div>
        </div>
      </ViewTransition>

      <div className="relative">
        <nav className="lg:sticky top-0">
          <BackLinkWithHand
            href="/blog"
            useBack={false}
            className="fixed lg:absolute"
          />
        </nav>

        <div className={`mx-auto max-w-[600px] px-5 md:px-6 py-6 relative`}>
          <main className={classes.content}>
            <MDXRemote
              source={story.content}
              components={{
                Image: MyImage,
                Poem,
                YouTube,
                Video,
                h1: createLinkedHeading("1"),
                h2: createLinkedHeading("2"),
                h3: createLinkedHeading("3"),
                h4: createLinkedHeading("4"),
                h5: createLinkedHeading("5"),
                h6: createLinkedHeading("6"),
              }}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </main>
          <nav className="py-8 grid grid-cols-2 gap-2 text-2xl">
            {story.previous && (
              <div className="flex flex-col items-start justify-start">
                <span className="uppercase text-foreground-gray text-xs font-light tracking-wider">
                  Previous
                </span>
                <Link
                  href={`/${story.previous.slug}`}
                  className="px-2 py-1 -mx-2 rounded-sm hocus:bg-muted transition-colors duration-200 text-link italic"
                >
                  {story.previous.data.title}
                </Link>
              </div>
            )}
            {story.next && (
              <div className="flex flex-col items-end justify-end sm:col-start-2">
                <span className="uppercase text-foreground-gray text-xs font-light tracking-wider">
                  Next
                </span>
                <Link
                  href={`/${story.next.slug}`}
                  className="px-2 py-1 -mx-2 rounded-sm hocus:bg-muted transition-colors duration-200 text-right text-link italic"
                >
                  {story.next.data.title}
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </article>
  )
}

type HeadingLevels = "1" | "2" | "3" | "4" | "5" | "6"

function createLinkedHeading(level: HeadingLevels) {
  return function Heading({
    children,
    ...props
  }: {
    children?: React.ReactNode
  }) {
    const slug = slugify(children as string)
    const Comp = `h${level}` as const
    return (
      <Comp {...props} id={slug}>
        <a href={`#${slug}`}>{children}</a>
      </Comp>
    )
  }
}
