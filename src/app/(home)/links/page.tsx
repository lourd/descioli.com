import { links } from "./links"
import { SocialLink } from "./social-link"

export const metadata = {
  title: "Social networks",
  description: "Where you can find me on the internet",
  keywords: [
    "social media",
    "hangouts",
    "email",
    "twitter",
    "linkedin",
    "facebook",
    "contact",
    "snapchat",
    "github",
    "instagram",
  ],
}

export default function SocialPage() {
  return (
    <div className="h-full flex flex-col justify-center">
      <nav className="flex flex-col gap-1 w-fit">
        {links.map((link) => {
          return <SocialLink key={link.link} link={link} />
        })}
      </nav>
    </div>
  )
}
