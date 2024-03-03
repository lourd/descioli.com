import Link from "next/link"

export const metadata = {
  title: "Sketches",
  description: "Explorations and tools",
}

const links = [
  {
    name: "A better Ecosystem lights interface",
    description:
      "A new take on setting the lights on my still-living Grove Ecosystem",
    link: "/ecosystem",
  },
]

export default function ExperimentsPage() {
  return (
    <div className="h-full flex flex-col sm:max-w-xl lg:pt-8">
      <p className="text-2xl text-balance">{"Explorations and tools"}</p>
      <hr className="border-muted mt-2 mb-6" />
      <nav className="flex flex-col gap-1 w-fit">
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
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
