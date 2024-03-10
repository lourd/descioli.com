import Link from "next/link"

export const metadata = {
  title: "Sketches",
  description: "Explorations and tools",
}

const links = [
  {
    name: "A New Ecosystem Interface",
    description: "A new take on controlling my still-living Ecosystem",
    link: "/ecosystem",
    date: new Date("2023-12-17"),
  },
  {
    name: "Hand Tracking",
    description: "Exploring the WebXR Hand Tracking API",
    link: "/hand-tracking",
    date: new Date("2021-03-08"),
  },

  {
    name: "Generative 3D Lines",
    description: "Generative line fun in 3D",
    link: "/3d-lines",
    date: new Date("2021-02-26"),
  },
  {
    name: "Generative Circles",
    description: "Exploring a nested circle design generatively",
    link: "/generative-circles",
    date: new Date("2021-02-11"),
  },
  {
    name: "Cursor Follow Motion Study",
    description: "Learning Framer Motion by following a mouse cursor",
    link: "/cursor-follow",
    date: new Date("2021-01-31"),
  },
]

export default function ExperimentsPage() {
  return (
    <div className="h-full flex flex-col sm:max-w-xl lg:pt-8">
      <p className="text-2xl text-balance">{"Explorations and tools"}</p>
      <hr className="border-muted mt-2 mb-4" />
      <nav className="flex flex-col gap-3">
        {links.map((link) => {
          return (
            <Link
              key={link.link}
              href={link.link}
              className="group flex flex-col py-1 px-2 text-xl md:text-3xl font-bold duration-200 hocus:bg-muted rounded text-link"
            >
              {link.name}
              <div className="text-base font-extralight text-foregroundGray">
                {link.description}
              </div>
              <time className="text-xs font-extralight text-foregroundGray leading-normal">
                {link.date.toDateString()}
              </time>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
