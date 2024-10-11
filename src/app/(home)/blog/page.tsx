import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"

import { getStories } from "@/lib/get-stories"

export const metadata = {
  title: "Blog",
  description: "Stories and reflections from the silicon trenches",
}

export default async function Blog() {
  const stories = await getStories()

  return (
    <div className="flex flex-col pt-4 md:pt-8 md:max-w-xl">
      <p className="text-3xl md:text-4xl text-balance">
        {"Stories and reflections from the silicon trenches"}
      </p>
      <hr className="border-muted mt-2 mb-8" />
      {stories.map((story, idx) => {
        return (
          <Link
            href={`/${story.slug}`}
            className="block relative max-w-[600px] aspect-[20/9] lg:aspect-[29/9] mb-7 md:mb-12 w-full overflow-hidden shadow dark:shadow-gray-900 group"
            key={idx}
          >
            <div className="absolute top-0 bottom-0 right-0 left-0 z-10 flex flex-col justify-center py-1 px-4 md:px-6 text-shadow shadow-black/50 text-white">
              <h2 className="font-bold text-2xl md:text-3xl">
                {story.data.title}
              </h2>
              <h3 className="font-light md:mt-1 mb-1 text-base md:text-xl text-balance">
                {story.data.description}
              </h3>
              <p className="text-xs md:text-sm">
                {format(story.data.publication, "MMMM do, yyyy")} •{" "}
                {story.readLength} min read
              </p>
            </div>
            <Image
              src={story.data.image}
              alt=""
              // FIXME
              width={1200}
              height={1200}
              loading="lazy"
              className="absolute w-full h-full object-cover top-0 left-0 blur-sm transition duration-200 group-hover:blur-0 group-hover:scale-[1.03] group-focus:blur-0 group-focus:scale-[1.03] object-center"
            />
            <div className="backdrop-brightness-[0.85] absolute top-0 left-0 right-0 bottom-0" />
          </Link>
        )
      })}
    </div>
  )
}
