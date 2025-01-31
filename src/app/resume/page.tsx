import clsx from "clsx"
import { format } from "date-fns"
import Link from "next/link"
import { ReactNode } from "react"

import { BackLinkWithHand } from "@/components/back-link"

import { Job, resume, School, TimePeriod } from "./resume"

export const metadata = {
  title: "Resume",
}

export default function ResumePage() {
  return (
    <>
      <BackLinkWithHand href="/" className="print:hidden sticky" />
      <main className="relative pt-2 pb-8 md:pt-10 px-[2.5%] max-w-[800px] mx-auto [&_a]:text-link [&_a:visited]:text-link-visited print:[&_a]:text-foreground print:[&_a:visited]:text-foreground">
        <h1 className="text-center text-4xl medium:mb-2 font-bold leading-tight">
          {resume.name}
        </h1>
        <ContactDatum className="md:block print:hidden md:absolute md:top-10 md:right-[2.5%]">
          {/* Generated with /resume.pdf and then put in public/ manually  */}
          <a
            href="/Louis DeScioli Resume.pdf"
            className="text-[0.75rem] print:hidden"
          >
            PDF Version
          </a>
        </ContactDatum>
        <section className="hidden print:flex flex-row justify-center">
          <ContactDatum>
            <Link href="/">{resume.site}</Link>
          </ContactDatum>
          <ContactDatum>
            <a href={`mailto:${resume.email}`}>{resume.email}</a>
          </ContactDatum>
        </section>
        <section>
          <SectionTitle>Experience</SectionTitle>
          {resume.work.map((job, i) => (
            <JobSection key={i} {...job} />
          ))}
        </section>
        <section>
          <SectionTitle>Volunteer Experience</SectionTitle>
          {resume.volunteer.map((job, i) => (
            <JobSection key={i} dense {...job} />
          ))}
        </section>
        <section>
          <SectionTitle>Education</SectionTitle>
          {resume.education.map((school, i) => (
            <SchoolSection key={i} {...school} />
          ))}
        </section>
      </main>
    </>
  )
}

const DATE_FORMAT = "MMM yyyy"

/**
 * Handles the formatting for the different expected types of date range data
 */
const datesFormatter = (dates: TimePeriod) => {
  if (!dates) return null
  if (typeof dates === "string") return dates
  const { start, end, recurring } = dates
  if (recurring) {
    return recurring
      .map((date) => format(new Date(date), DATE_FORMAT))
      .join(", ")
  }
  if (!start) throw new Error("expected start date")
  const formattedStart = format(new Date(start), DATE_FORMAT)
  if (!end) return `${formattedStart} - Present`
  const formattedEnd = format(new Date(end), DATE_FORMAT)
  return `${formattedStart} - ${formattedEnd}`
}

function ContactDatum({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h5 className={`px-[5px] text-center font-semibold ${className}`}>
      {children}
    </h5>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <>
      <h2 className="mb-0 mt-4 text-2xl font-bold">{children}</h2>
      <hr className="mt-[2px] mb-2 border-foreground" />
    </>
  )
}

function Subtitle({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-[0.9rem] font-bold mb-0">
      {children}
    </span>
  )
}

function Comma() {
  return <span className="font-thin hidden sm:inline">,&nbsp;</span>
}

function Years({ children }: { children: TimePeriod }) {
  return (
    <span className="text-gray-400 text-[0.8rem] whitespace-nowrap text-left sm:pl-1 sm:text-right print:text-right sm:grow print:grow">
      {datesFormatter(children)}
    </span>
  )
}

function JobSection(props: Job & { className?: string; dense?: boolean }) {
  let company: ReactNode = props.company
  if (!props.story && props.site) {
    company = (
      <a
        href={props.site}
        target="_blank"
        rel="noopener noreferrer"
        className="hocus:underline"
      >
        {company}
      </a>
    )
  }

  const content = (
    <>
      <div className="flex flex-col items-baseline sm:flex-row print:flex-row">
        <div className="flex flex-col flex-wrap items-baseline sm:flex-row print:flex-row">
          <span className="text-[1.1rem] sm:text-[0.9rem] font-bold mb-0">
            {props.role}
          </span>
          <span className="text-[0.8rem] sm:px-[5px] print:px-[5px] hidden sm:inline-flex print:inline-flex">
            -
          </span>
          <span>
            <Subtitle>{company}</Subtitle>
            <Comma />
            <span className="text-[0.8rem]">&nbsp;{props.location}</span>
          </span>
        </div>
        <Years>{props.dates}</Years>
      </div>
      {props.bullets && (
        <ul
          className={clsx(
            "mt-1",
            props.bullets.length > 1 && "print:ml-5 sm:ml-5"
          )}
        >
          {props.bullets.map((b, i, arr) => (
            <li
              key={i}
              className={clsx(
                "mb-2 mt-1 text-sm leading-tight list-none print:mb-0 sm:mb-0 [&_a:hover]:underline [&_a:focus]:underline",
                arr.length > 1 && "md:list-disc print:list-disc"
              )}
              dangerouslySetInnerHTML={{ __html: b }}
            />
          ))}
        </ul>
      )}
    </>
  )

  const paddingClasses = `px-2 py-2 ${
    !props.bullets?.length
      ? props.dense
        ? "sm:pb-0 print:pb-0"
        : "sm:pb-1 print:pb-1"
      : "pb-3"
  }`
  if (props.story) {
    return (
      <Link
        href={props.story}
        className={`${paddingClasses} w-full block no-underline transition-colors duration-200 rounded-md hocus:bg-gray-100 dark:hocus:bg-gray-800`}
      >
        {content}
      </Link>
    )
  }
  return <div className={`${paddingClasses} w-full`}>{content}</div>
}

function SchoolSection(props: School) {
  return (
    <div className="p-[10px] md:p-2 [&_a:hover]:underline [&_a:focus]:underline [&_p]:text-sm [&_p]:leading-normal">
      <div className="flex flex-col items-baseline flex-wrap justify-between sm:flex-row print:flex-row">
        <a
          href={props.school.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-lg font-bold"
        >
          {props.school.name}
        </a>
        <Years>{props.years}</Years>
      </div>
      <section className="md:pl-2">
        {props.degree != null && props.major != null && (
          <p>
            {props.degree} {"in "}
            <a
              href={props.major.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.major.name}
            </a>
          </p>
        )}
        {props.concentration && (
          <p>
            {"Concentration in "}
            <a
              href={props.concentration.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.concentration.name}
            </a>
          </p>
        )}
        {props.transfer != null && <p>{props.transfer}</p>}
        {props.transfer && props.major != null && (
          <p>
            {"Studied "}
            <a
              href={props.major.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.major.name}
            </a>
          </p>
        )}
        {props.extracurriculars &&
          props.extracurriculars.map((activity) => {
            const content = activity.link ? (
              <a href={activity.link} target="_blank" rel="noopener noreferrer">
                {activity.name}
              </a>
            ) : (
              activity.name
            )
            return <p key={activity.name}>{content}</p>
          })}
      </section>
    </div>
  )
}
