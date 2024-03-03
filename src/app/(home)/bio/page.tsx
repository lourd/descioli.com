import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Bio",
  description: "A little about me",
}

export default function BioPage() {
  return (
    <div className="flex flex-col justify-center max-w-md text-lg font-serif md:mt-12 pb-2">
      <p>
        My name is Louis DeScioli (pronounced Dee-see-oh-lee). I love making
        magic moments with computers.
      </p>
      <br />
      <p>
        {
          "I've been fascinated with computers ever since I stuck a comb in the floppy drive of my family's computer at 5 years old. It was my first experiment for how we might interact with computers in novel ways.  I've been tinkering ever since."
        }
      </p>
      <br />
      <p>
        {
          "I'm a proud Italian American man, the son of a humble West Point graduate father and brilliant, hard-working mother, and the brother of an assertively caring older sister. Family, community, and service are the pillars of my life. I have a loving heart, a salesman's laugh, and a scrutinous mind."
        }
      </p>
      <br />
      <p>
        {
          "I am also a programming nerd and XR enthusiast. I watch videos of people coding to relax and open the dev tools on all of my favorite websites to figure out what they're built with. I'm a polyglot, full-stack developer whose favorite part of the stack is the front-end. My favorite tools to build things with are TypeScript and React, as well as Unity and C#."
        }
      </p>
      <br />
      <p>
        {
          "I've spent my 10+ year career figuring out how to use computers to connect us more meaningfully with ourselves, each other, and the world around us. I've built strange and wonderful things, from smart aquaponic gardens, to autism therapy applications, to “the metaverse”. You can read about these and more on "
        }
        <Link href="/blog" className="text-link hocus:underline">
          my blog
        </Link>
        {" or get the cliff notes from "}
        <Link href="/resume" className="text-link hocus:underline">
          my resume
        </Link>
        .
      </p>
      <br />
      <p>
        {
          "I'm currently in the midst of starting my own company. I'm the co-founder and CEO of (name coming soon), building an augmented reality telepresence application."
        }
      </p>
      <br />
      <p>
        I grew up in Kingwood, TX and currently live in New York City with the
        love of my life, my wife Jaimie, and our adorable little dog, Merlin.
        Follow me on my journey or get in touch via{" "}
        <Link href="/links" className="text-link hocus:underline">
          these platforms
        </Link>
        .
      </p>
    </div>
  )
}
