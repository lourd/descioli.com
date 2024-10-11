/* eslint-disable @next/next/no-img-element */
import fs from "fs/promises"

import { format } from "date-fns"
import { ImageResponse } from "next/og"

import { getSlugs, getStory } from "@/lib/get-stories"

const size = {
  width: 1200,
  height: 630,
}

export async function generateStaticParams() {
  return await getSlugs()
}

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const story = await getStory(params.slug)
  const url = new URL(`../../../../public${story.data.image}`, import.meta.url)
  const imgData = await fs.readFile(url.pathname)

  const [interRegular, interBold, interLight] = await Promise.all([
    fetchFont(`https://fonts.googleapis.com/css2?family=Inter:opsz@14..32`),
    fetchFont(
      `https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,700`
    ),
    fetchFont(
      `https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300`
    ),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "Inter",
          textShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
          color: "white",
        }}
      >
        <img
          src={imgData.buffer as any}
          alt=""
          tw="absolute top-0 left-0 right-0 bottom-0"
          style={{
            filter: "blur(4px)",
            objectFit: "cover",
          }}
        />
        <div tw="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30" />
        <div
          tw="py-14 px-20"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 104,
              fontWeight: "bold",
            }}
          >
            {story.data.title}
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 300,
              paddingTop: 8,
              paddingRight: 60,
            }}
          >
            {story.data.description}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: 18,
              fontSize: 38,
              fontWeight: 300,
            }}
          >
            {format(story.data.publication, "LLLL do, yyyy")} •{" "}
            {story.readLength} min read
          </div>
        </div>
      </div>
    ),
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interLight,
          style: "normal",
          weight: 300,
        },
        {
          name: "Inter",
          data: interRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Inter",
          data: interBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  )
}

/**
 * Referenced https://github.com/vercel/satori/blob/618d565edb83270d9b829edc430788032e6f2bc6/playground/pages/api/font.ts#L86-L111
 */
async function fetchFont(gfontsUrl: string): Promise<ArrayBuffer> {
  const css = await fetch(gfontsUrl, {
    headers: {
      // Make sure it returns TTF.
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  }).then((res) => res.text())

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
  if (!resource) throw new Error("missing font resource")
  return await fetch(resource[1]).then((res) => res.arrayBuffer())
}
