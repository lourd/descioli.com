export const resume: Resume = {
  name: "Louis R. DeScioli",
  email: "louis.descioli@gmail.com",
  site: "www.descioli.com",
  education: [
    {
      school: {
        name: "Massachusetts Institute of Technology",
        link: "https://web.mit.edu/",
      },
      degree: "Bachelor of Science",
      major: {
        name: "Electrical Engineering and Computer Science (6-2)",
        link: "https://www.eecs.mit.edu/academics-admissions/undergraduate-programs/course-6-2-electrical-eng-computer-science",
      },
      concentration: {
        name: "Comparative Media Studies",
        link: "https://cmsw.mit.edu",
      },
      years: {
        start: "2011-08-01",
        end: "2014-06-30",
      },
      extracurriculars: [
        {
          name: "Gordon Engineering Leadership Program",
          link: "https://gelp.mit.edu",
        },
        {
          name: "Undergraduate Practice Opportunities Program",
          link: "https://upop.mit.edu/",
        },
        {
          name: "Delta Upsilon & Theta Tau Fraternities",
        },
      ],
    },
    {
      school: {
        name: "United States Air Force Academy",
        link: "https://www.usafa.edu/",
      },
      transfer: "Transferred to MIT after sophomore year",
      major: {
        name: "Computer Engineering",
        link: "https://www.usafa.edu/department/electrical-computer-engineering/",
      },
      years: {
        start: "2009-06-25",
        end: "2011-07-19",
      },
      extracurriculars: [
        {
          name: "CS-26 and CS-11",
        },
        {
          name: "Cadet Orchestra - Cello",
        },
        {
          name: "Blue Bards - Pit Orchestra - Cello",
        },
        {
          name: "Ultimate Frisbee Club Team",
        },
      ],
      commendations: ["Deans List: Fall 2009, Spring 2010, and Fall 2010"],
    },
    {
      school: {
        name: "Kingwood High School",
        link: "https://www.humbleisd.net/khs",
      },
      years: {
        start: "2005-08-01",
        end: "2009-05-31",
      },
      extracurriculars: [
        {
          name: "National Honor Society",
        },
        {
          name: "Varsity Swimming",
        },
        {
          name: "Varsity Track & Field - Pole vaulting",
        },
        {
          name: "Chamber II Orchestra - Cello",
        },
        {
          name: "Beta Club",
        },
      ],
    },
  ],
  work: [
    {
      company: "Together",
      site: "https://www.together.online",
      location: "New York, NY",
      role: "Founder & CEO",
      dates: {
        start: "2024-01-02",
      },
      bullets: [
        "Meaningful communication & multiplayer computing meets mixed reality.",
      ],
    },
    {
      company: "Spatial",
      site: "https://www.spatial.io",
      location: "New York, NY",
      role: "Staff Product Growth Engineer",
      dates: {
        start: "2022-09-01",
        end: "2023-12-31",
      },
      bullets: [
        "Co-lead for researching, identifying and executing product growth strategies and experiments with a primary focus on user retention.",
        "Data engineer and analyst. Created the company's data warehouse, and created and maintained many product dashboards, analyses, and models.",
        "Led the creation of the Spatial product experiment system, a full-stack, cross-platform feature flag system for running product tests and developing new features.",
        "Led a revamp of the Spatial Mobile application, as both product and engineering lead. Doubled the Spatial Mobile MAU in the first week post-launch.",
        "Conceived of and led the creation of the Discovery system. Created curation & experimentation tools that powered dynamic, cross-platform recommended content feeds.",
        'Led the creation of the push notification system and revamped all new user messaging, using the <a href="https://customer.io">Customer.io</a> platform.',
        "Managed 2 direct reports.",
        "Built many features and squashed many, many bugs in the Spatial VR, Mobile and Web applications.",
      ],
    },
    {
      company: "Spatial",
      site: "https://www.spatial.io",
      location: "New York, NY",
      role: "Senior Software Engineer",
      dates: {
        start: "2021-07-01",
        end: "2022-07-31",
      },
      bullets: [
        "Architect of the React shell of the Spatial Web, Mobile, and VR applications. Designed and implemented a high-performance, cross-platform React application architecture that was ~95% faster than the architecture it replaced. I enabled 40x growth in the Spatial Web application in my first 4 months.",
        'Lead engineer for the Spatial Web platform. Designed, led, and implemented the migration of the Spatial Web application from a static "Jamstack" web application to a dynamic full-stack web application, using <a href="https://nextjs.org">Next.js</a>.',
        "Led the integration of the Webflow-built spatial.io website and app.spatial.io Spatial Web application. Designed a novel method for automatically merging the two sites at build-time to enable continued Webflow use.",
        'Architected the Spatial source code monorepo. Using <a href="https://nx.dev">Nx</a>, built the workflows that power engineering for the Spatial web, mobile and VR applications, as well as over a dozen more internal applications and tools.',
        "Helped improve overall engineering quality and velocity across the team by starting a design docs process and catalyzing a trunk-based development team workflow.",
        "Built many features and squash many, many bugs in the Spatial VR, Mobile and Web applications.",
        "Mentored and developed ~10 junior UI engineers and interns.",
      ],
    },
    {
      company: "Google Lens",
      site: "https://lens.google.com",
      location: "New York, NY",
      role: "UX Engineer",
      dates: {
        start: "2020-02-01",
        end: "2021-05-31",
      },
      bullets: [
        "Led UX engineering for Google Lens for Web, integrating visual search capabilities across Google's web services.",
        "Wrote production UI and back-end C++ for Google Lens integrations into google.com.",
      ],
    },
    {
      company: "Google Daydream",
      site: "https://arvr.google.com",
      location: "New York, NY",
      role: "Augmented Reality UX Engineer",
      dates: {
        start: "2018-04-30",
        end: "2020-01-31",
      },
      bullets: [
        "Designed and engineered the first augmented reality experiences in the YouTube mobile app as part of pilot projects with a major movie studio and mobile gaming brand in the summer of 2018.",
        'Led UX engineering for <a href="https://techcrunch.com/2019/06/18/youtubes-new-ar-beauty-try-on-lets-viewers-virtually-try-on-makeup-while-watching-video-reviews/">v1 of the AR Beauty Try-on format</a>.',
        "Built the production implementation of the UI for the AR Beauty Try-on format.",
        "Designed and prototyped application concepts for passthrough and see-through augmented reality HMDs.",
        "Led UX engineering for an internal AR authoring tool.",
      ],
    },
    {
      company: "Out Here Studio",
      site: "https://outhere.studio",
      location: "Cambridge, MA",
      role: "Founder, Designer & Developer",
      story: "/out-here-archery",
      dates: {
        start: "2017-07-01",
      },
      bullets: [
        "Designed and developed a 5-star iPhone and iPad augmented reality game using ARKit and Unity.",
        "Pioneered novel mobile mixed reality environment interaction design.",
      ],
    },
    {
      company: "Sidekicks",
      site: "https://sidekicks.com/",
      location: "Cambridge, MA",
      role: "Senior Designer & UI Engineer",
      story: "/sidekicks",
      dates: {
        start: "2016-10-01",
        end: "2017-06-30",
      },
      bullets: [
        "Designed, developed, and shipped a new, vastly improved version of the Sidekicks autism therapy desktop web application, written in JavaScript using React and Firebase.",
        "Overhauled the company's user interface design system.",
      ],
    },
    {
      company: "Grove",
      site: "https://grovegrown.com",
      location: "Somerville, MA",
      role: "Head of Sales and Strategy",
      story: "/grove#sales",
      dates: {
        start: "2016-04-01",
        end: "2016-06-30",
      },
      bullets: [
        "Led the sales & marketing team to reach a $600K revenue goal that unlocked an investment tranche of $1.2M.",
        "Led fundamental customer discovery and market research.",
      ],
    },
    {
      company: "Grove",
      site: "https://grovegrown.com",
      location: "Somerville, MA",
      role: "Lead Software Engineer",
      story: "/grove",
      dates: {
        start: "2014-01-03",
        end: "2016-06-30",
      },
      bullets: [
        "Built the software design and engineering teams from the ground up; managed as many as 10 people when the teams were at their largest.",
        "Architected and implemented two generations of real-time Internet of Things systems, spanning embedded and server platforms, written in C++ and Node.js, respectively.",
        "Developed and shipped a native iOS application written in Swift for v2 of the Grove Ecosystem.",
        "Ran a successful Kickstarter campaign, selling 125+ units at over $3.3K each, securing over $410K in revenue.",
        "Designed, developed, and shipped a mobile web application written in JavaScript with React for v1 of the Grove Ecosystem.",
        "Developed and operated internal dashboards for tracking engagement metrics and communicating with customers.",
        "Designed the company's internal leadership and decision making framework.",
        "Designed and developed three generations of the company website.",
      ],
    },
    {
      company: "Vecna",
      site: "https://www.vecna.com",
      location: "Cambridge, MA",
      role: "Embedded Systems Engineering Intern",
      dates: {
        start: "2013-06-01",
        end: "2013-08-14",
      },
    },
    {
      company: "6.00 - Intro to CS and Programming",
      location: "MIT",
      role: "Lab Assistant",
      dates: {
        start: "2012-09-01",
        end: "2013-05-30",
      },
    },
    {
      company: "MIT China Education Technology Initiative",
      location: "Dalian, Wuhan & Wuxi, China",
      role: "Student Teacher",
      dates: {
        start: "2012-06-01",
        end: "2012-07-30",
      },
    },
    {
      company: "Mediated Matter Group",
      location: "MIT Media Lab",
      site: "http://matter.media.mit.edu/",
      role: "Research Assistant",
      story: "/mediated-matter",
      dates: {
        start: "2011-10-01",
        end: "2011-12-15",
      },
    },
  ],
  volunteer: [
    {
      company: "America on Tech",
      site: "https://www.americaontech.org/",
      location: "New York, NY",
      role: "Lead Instructor",
      dates: {
        start: "2020-09-01",
        end: "2021-05-31",
      },
    },
    {
      company: "Pursuit",
      site: "https://www.pursuit.org/",
      location: "New York, NY",
      role: "Mentor",
      dates: {
        start: "2020-07-01",
        end: "2021-05-31",
      },
    },
    {
      company: "Reality Virtually Hackathon",
      site: "https://realityvirtuallyhack.com",
      location: "Cambridge, MA",
      role: "Mentor",
      dates: {
        recurring: ["2019-01-18"],
      },
    },
    {
      company: "Resilient Coders",
      site: "https://www.resilientcoders.org/",
      location: "Boston, MA",
      role: "Mentor",
      dates: {
        start: "2017-07-01",
        end: "2018-01-30",
      },
    },
    {
      company: "NodeSchool Boston",
      site: "https://nodeschool.io/",
      location: "Boston, MA",
      role: "Mentor",
      dates: {
        start: "2016-10-01",
        end: "2017-10-15",
      },
    },
    {
      company: "Technology Chapter Alumni Association",
      location: "Boston, MA",
      role: "Director",
      dates: {
        start: "2014-08-01",
        end: "2017-02-20",
      },
    },
    {
      company: "HackMIT",
      site: "https://hackmit.org",
      location: "Cambridge, MA",
      role: "Mentor",
      dates: {
        recurring: ["2015-09-01", "2016-09-01"],
      },
    },
    {
      company: "Boston Urban Agriculture Meetup",
      location: "Boston, MA",
      role: "Co-organizer",
      dates: {
        start: "2015-07-01",
        end: "2016-06-30",
      },
    },
    {
      company: "Boston Meteor Meetup",
      location: "Boston, MA",
      role: "Co-organizer",
      dates: {
        start: "2014-11-01",
        end: "2015-09-30",
      },
    },
    {
      company: "Delta Upsilon Technology Chapter",
      location: "Boston, MA",
      role: "President",
      dates: {
        start: "2013-08-01",
        end: "2013-12-31",
      },
    },
    {
      company: "MIT Interfraternity Council",
      location: "Cambridge, MA",
      role: "Vice President",
      dates: {
        start: "2011-11-01",
        end: "2012-10-31",
      },
    },
    {
      company: "Dept. of Computer Science",
      location: "USAFA",
      role: "Research Assistant",
      dates: {
        start: "2010-09-01",
        end: "2011-05-05",
      },
    },
  ],
}

export type NameAndLink = {
  name: string
  link?: string
}

export type TimePeriod = {
  start?: string
  end?: string
  recurring?: string[]
}

export type School = {
  school: NameAndLink
  degree?: string
  major?: NameAndLink
  concentration?: NameAndLink
  years: TimePeriod
  extracurriculars?: NameAndLink[]
  commendations?: string[]
  transfer?: string
}

export type Job = {
  company: string
  site?: string
  location?: string
  role: string
  story?: string
  dates: TimePeriod
  bullets?: string[]
}

export type Resume = {
  name: string
  email: string
  site: string
  education: School[]
  work: Job[]
  volunteer: Job[]
}
