import { formatInTimeZone } from "date-fns-tz"
import { MDXRemote } from "next-mdx-remote/rsc"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createElement } from "react"
import { onlyText } from "react-children-utilities"
import remarkGfm from "remark-gfm"

import { BackLinkWithHand } from "@/components/back-link"
import { Image as MyImage } from "@/components/image"
import { Poem } from "@/components/poem"
import { Video } from "@/components/video"
import { YouTube } from "@/components/youtube"
import { getSlugs, getStory, Story } from "@/lib/get-stories"
import { slugify } from "@/lib/slugify"

type PageProps = {
  params: {
    slug: string
  }
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<
  Array<PageProps["params"]>
> {
  return await getSlugs()
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const { data } = await getStory(params.slug)
    return {
      title: data.title,
      description: data.description,
      openGraph: {
        images: `/${params.slug}/og.png`,
      },
    }
  } catch (error) {
    console.error(error)
  }
}

export default async function StoryPage({ params }: PageProps) {
  let story: Story

  try {
    story = await getStory(params.slug)
  } catch (e) {
    if ((e as Error).message !== "Story not found") {
      throw e
    }
    notFound()
  }

  const { content, data, lastEditUrl, components } = story

  return (
    <article className="max-md:mt-12">
      <div className="relative">
        <Image
          alt=""
          className="min-h-[50vh] aspect-[5/2] max-h-[700px] w-full object-cover object-center"
          src={data.header || data.image}
          priority
          //   FIXME
          width={1200}
          height={1200}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0  z-[1] flex flex-col justify-end items-start text-white">
          <h1 className="text-5xl w-full max-w-[680px] p-6 mx-auto md:text-[4rem] text-shadow box-content shadow-black/30 font-bold leading-[1.1]">
            {data.title}
          </h1>
        </div>
      </div>

      <div className="relative">
        <nav className="lg:sticky top-0">
          <BackLinkWithHand
            href="/blog"
            useBack={false}
            className="fixed lg:absolute"
          />
        </nav>

        <main className="mx-auto max-w-[680px] box-content px-5 md:px-6 py-5 relative">
          <h2 className="text-3xl font-light text-balance">
            {data.description}
          </h2>
          <div className="pt-3 pb-5">
            <p className="text-gray-400 whitespace-pre">
              Published{" "}
              <time>
                {formatInTimeZone(
                  data.publication,
                  "UTC",
                  "eeee LLLL do, yyyy"
                )}
              </time>
            </p>
            {data.lastEdit && data.publication !== data.lastEdit && (
              <p className="text-gray-400 whitespace-pre">
                <a
                  href={lastEditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Last edited
                </a>{" "}
                <time>
                  {formatInTimeZone(data.lastEdit, "UTC", "eeee LLLL do, yyyy")}
                </time>
              </p>
            )}
          </div>

          <div>
            <MDXRemote
              source={content}
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
                p: (props) => (
                  <p className="font-serif mb-6 text-lg" {...props} />
                ),
                a: (props) => (
                  <a
                    className="text-link underline visited:text-link-visited"
                    {...props}
                  />
                ),
                ul: (props) => (
                  <ul
                    className="list-disc list-outside mt-0 mr-0 mb-[1.45rem] ml-[1.45rem]"
                    {...props}
                  />
                ),
                li: (props) => (
                  <li {...props} className="mb-2 text-lg font-serif" />
                ),
                ...components,
              }}
              options={{
                mdxOptions: {
                  useDynamicImport: true,
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>
          <nav className="my-10 grid grid-cols-2 text-2xl text-link italic">
            <div className="flex justify-start">
              {story.previous && (
                <Link
                  href={`/${story.previous.slug}`}
                  className="px-2 py-1 rounded hocus:bg-muted transition-colors duration-200 text-center flex justify-center items-center"
                >
                  👈&nbsp;&nbsp;<span>{story.previous.data.title}</span>
                </Link>
              )}
            </div>
            <div className="flex justify-end">
              {story.next && (
                <Link
                  href={`/${story.next.slug}`}
                  className="px-2 py-1 rounded hocus:bg-muted transition-colors duration-200 text-center flex justify-center items-center"
                >
                  <span>{story.next.data.title}</span>&nbsp;&nbsp;👉
                </Link>
              )}
            </div>
          </nav>
        </main>
      </div>
    </article>
  )
}

function createLinkedHeading(level: string) {
  return function Heading({
    children,
    ...props
  }: {
    children?: React.ReactNode
  }) {
    const textContent = onlyText(children)
    const slug = slugify(textContent)
    return createElement(
      `h${level}`,
      {
        ...props,
        id: slug,
        className: `relative group ${level === "2" ? "text-2xl font-bold pt-6 pb-3" : ""} ${level === "3" ? "text-xl font-bold pt-2 pb-3" : ""}`,
      },
      <a
        href={`#${slug}`}
        className="absolute left-0 -translate-x-[100%] font-light !text-gray-400 !no-underline after:content-['#'] transition-opacity duration-100 pr-[3px] md:px-2 opacity-0 focus:opacity-100 group-hover:opacity-100"
      />,
      children
    )
  }
}
