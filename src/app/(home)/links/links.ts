export type Link = {
  name: string
  description: string
  link: string
  color: string
  bg: string
  copyToClipboard?: true
}

export const links: Link[] = [
  {
    name: "Twitter",
    description: "Where I shout into the public square",
    link: "https://twitter.com/descioli",
    color: "white",
    bg: "#2AA3EF",
  },
  {
    name: "LinkedIn",
    description: "Where I act like a professional",
    link: "https://www.linkedin.com/in/louisdescioli/",
    color: "white",
    bg: "#1178B3",
  },
  {
    name: "GitHub",
    description: "Where I commit my code",
    link: "https://github.com/lourd",
    color: "white",
    bg: "#26292E",
  },
  {
    name: "Instagram",
    description: "Where I share the funny, fleeting moments of my life",
    link: "https://www.instagram.com/louisrd/",
    color: "white",
    bg: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
  },
  {
    name: "Email",
    description: "Where I get mail",
    copyToClipboard: true,
    link: "louis.descioli@gmail.com",
    color: "black",
    bg: "#f2f2f2",
  },
  // {
  //   name: "Snapchat",
  //   description: "Where I used to share the funny, fleeting moments of my life",
  //   link: "https://www.snapchat.com/add/louisrd",
  //   color: "#262626",
  //   bg: "#FEFA37",
  // },
  {
    name: "Facebook",
    description: "Where my friends wish me happy birthday",
    link: "https://facebook.com/louis.descioli",
    color: "white",
    bg: "#4468B0",
  },
  // {
  //   name: "Meetup",
  //   description: "Where I geek out in person",
  //   link: "https://www.meetup.com/members/117150522",
  //   color: "white",
  //   bg: "#F44362",
  // },
  // {
  //   name: "Poly",
  //   description: "Where I share my 3D art",
  //   link: "https://poly.google.com/user/6ygncoac9fM",
  //   color: "white",
  //   bg: "#E21D5B",
  // },
  {
    name: "Spotify",
    link: "https://open.spotify.com/user/ldesci",
    description: "Where I listen to music",
    color: "black",
    bg: "#1ED760",
  },
  {
    name: "YouTube",
    description: "Where I upload videos",
    link: "https://www.youtube.com/c/LouisDeScioli",
    color: "white",
    bg: "#D7311E",
  },
]
