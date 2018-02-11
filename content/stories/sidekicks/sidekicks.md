---
publication: 2018-02-09
lastEdit: 2018-02-10
date: 2016-10-02
title: Sidekicks
description: Building an affinity therapy platform for autistic children
path: /sidekicks
image: screenshot.png
header: usage.png
tags:
  - work
  - portfolio
  - autistm
  - chatbot
  - startup
  - language processing
  - design
  - kubernetes
  - mission
---

I joined [Sidekicks](https://www.sidekicks.com) as a software engineer at the beginning of October in 2016 and left in June of 2017. During my tenure there I learned a great deal about autism, played a pivotal role in overhauling the company's design systems, and led the creation of a new, vastly improved version of the company's web application.

# Origin story

Sidekicks was created from the excitement over _Life, Animated_, a book written by the CEO, Ron Suskind, about the experience of raising his autistic son, Owen. It's a heartwarming story about their family's journey to connect with Owen through his passion. After critical acclaim, the book went on to become [a documentary](https://www.youtube.com/watch?v=OY5wsdfgjXg) and was nominated for the Academy Award for Best Documentary in 2017. It is a powerful movie and I strongly recommend watching it.

https://www.youtube.com/watch?v=xqgvRLTOscA

# Learning about autism

Before joining Sidekicks I had very little exposure to autistic people or autistic culture. Meeting and listening to so many autistic people and their families was far and away the most valuable experience I had while at Sidekicks. The most powerful piece of literature I read was [_Loud Hands_](http://autisticadvocacy.org/book/loud-hands-autistic-people-speaking/), a collection of essays, poems, and musings by autistic people about their lives. It introduced me to the [Autistic Self Advocacy Network](http://autisticadvocacy.org/). It taught me about the deeply troubling past the United States has with mental health disabilities. I learned about Ari Ne'eman, Julia Bascom, and many other activists for autistic and disabled rights. It is one of the most moving books I have ever read. Many times throughout reading it I had to set it down, overwhelmed with sadness as I took in the painful personal stories of how autistic people are treated in our society. I left Sidekicks a strong proponent of rights for disabled people, the neurodiversity paradigm, and self-advocacy for disabled people.

# Affinity therapy

The core idea that the Suskind's practiced with Owen and that Sidekicks built on is [affinity therapy](http://www.autistes-et-cliniciens.org/Affinity-Therapy-The-Return-of-a-Psychodynamic-Approach-to-the-Treatment-of). In conceptual terms, affinity therapy is meeting an autistic child where they're at and building from there. It is using their interests and passions as vessels for communicating with them. For Owen and the Suskind's, they used his overwhelming love for Disney and animated movies to engage with him. For other children, that passion may be anything from trains to Jewish comedians to ski lifts (all actual affinities of children I met).

You can read more about the ongoing research related to affinity therapy in [this Scientific American article](https://www.scientificamerican.com/article/an-oscar-nominated-film-inspires-a-new-approach-to-autism/).

![At the end of my second week at Sidekicks I attended a charity walk for autism where I talked with many parents and autistic children and began to learn about their unique interests and challenges. Here are three of my coworkers, Jake Lipson, Vannessa Greenleaf, and Rivka Barrett, staffing our booth.](autismWalk.jpg)

# The product

When I joined Sidekicks the company's product was a video and messaging system. On one side of a conversation was a child (the "hero") talking to an animated avatar (their "sidekick") through a mobile app. On the other side was their parent or a therapist talking back through a desktop web app. The adult could hear the child's voice and type replies for the sidekick to say, or send videos from our curated library of clips from movies and television.

In addition to people holding conversations between themselves and their children, we also offered a service where people could schedule a session with one of several paid professionals that we employed. We called this ["Coach on Demand"](https://www.youtube.com/watch?v=iHW-3VEEPOE). A few dozen families used this service frequently. Their children made distinct developmental progress while using it. They had sessions once, twice, or three times a week for usually 10-30 minutes where the coach talked with their child remotely through the avatar. Parents either participated in the conversation with the child or used the brief respite to do a chore around the house. Sometimes sessions happened on-the-go. Families worked sessions into their busy schedules by having them while they were driving with their child somewhere.

I spent many hours listening to the recordings of these sessions, studying the conversations that enabled these children to connect, learning about autistic speech patterns. I was humbled time and time again. Hearing a child lose control because of a design change, an abrupt application crash, or other bug also brought a new level of attention and caution to my coding and design.

https://www.youtube.com/watch?v=Cb7BGKtxsBk

## Fizbit

There was also an automated sidekick that children could talk with. We called this chatbot Fizbit. Fizbit could have a dynamic conversation with you about a variety of simple lessons using related pictures and clips. The chatbot was powered by custom-made conversation trees by the company's content team. Through Fizbit the company dabbled in natural language processing and machine learning.

https://www.youtube.com/watch?v=tSGBJEgekvE

## Remaking the coach's console

When I joined Sidekicks I was given responsibility of the company's web application. It was built with AngularJS and Firebase, and used WebRTC to stream the live audio recording from the child on their mobile device.

https://www.youtube.com/watch?v=gk1PPYImFB4

The application was not reliable. It had many bugs and often crashed in the middle of a session. It had lots of non-deterministic behavior. It didn't work on Firefox due to a memory overflow. I began my work by auditing the application in its entirety, measuring response times, application size, and documenting all of the issues encountered.

The application had no tests or documentation. There was loads of shared mutable state. Files were massive, with all kinds of . I quickly discovered fundamental architecture issues when my first task — adding a loading indicator for some data when the user changes a child's affinity — turned out to not be possible without huge changes to the code. AngularFire — the official library for integrating AngularJS and Firebase that we were using — made implicit, opaque bindings between our data model and front-end templates that prevented access to the moment of state change that triggered new data being loaded.

In addition to the web application's technical issues, early customers and user tests revealed that it had significant design issues as well. People reported feeling confused and overwhelmed by the interface, unsure of what they could or should do.

I proposed and led remaking the application. We focused first on the chat console. We hired the design firm IDEO to help us with redesigning the experience. I worked alongside their designer, Scott Slagsvol, to create a much cleaner and more intuitive application. I taught my fellow engineers modern front-end web development practices. I introduced them to the latest version of JavaScript and functional, declarative programming. (Our library soup mainly consisted of Babel, React, Redux, Redux-Saga, Webpack, ESLint, Jest, and Sass.)

During this time I also became proficient using [Docker](<https://en.wikipedia.org/wiki/Docker_(software)>) and [Kubernetes](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/). I learned a lot about "cloud native" operations and architecture from my boss, Dave Dupre. I learned the ins and outs of running a complex system on Google Cloud.

![The pull request where I swapped out the old application for the new one. There's nothing quite like removing 12 million lines of code! (It's so ridiculously high because the old application had its third party dependencies included.)](commit.png)

We launched the new and improved version of the chat console in January. It was replete with thorough documentation, several dozen automated tests for our most complex code, some slick animations, and ran smoothly and reliably on both Chrome and Firefox.

https://www.youtube.com/watch?v=Kt29dUEXSMI

## TestFlight

While we had a great new web application, the mobile app had a glaring issue — it wasn't available in the App Store. When it was submitted in September, Apple rejected it over copyright concerns due to the movie clips it contained. We asserted that the usage should fall under [fair use](https://en.wikipedia.org/wiki/Fair_use) because of the short duration of the clips, but Apple wanted explicit permission from each of the content owners. (The App Store is Apple's own domain, not a court of law. They dictate the rules.) For months we tried to work around this by [routing users through TestFlight](https://www.youtube.com/watch?v=AJBavfVtES8), Apple's program for beta testing applications. This meant we had a four or five additional steps to signup, and depended on a system out of our control. It added at least a few minutes to signup, which is unacceptable when your target market is parents of autistic children who have no time in their lives to waste. Many people dropped off in the middle. We tried calling interested customers and being on the phone through the signup process. Most cases took at least 10-15 minutes to get from the first page of registration to having their first chat. A couple extreme ones took as long as an **hour**. TestFlight was not tenable.

## YouTube

In March, at the behest of one of our investors, we decided to drastically change the product in order to get into the App Store. We removed our curated content and suggestions and in its place put YouTube search. We offerred a handful of canned searches, but parents were now on their own to figure out what content they wanted to show their children, and what about it they wanted to discuss. (It was during this time that I was first exposed to the [strange universe of YouTube content for children](https://medium.com/@jamesbridle/something-is-wrong-on-the-internet-c39c471271d2).)

After making that change, the app was accepted into the App Store within hours.

## Pivot

Although we were in the App Store, the new version with YouTube did not go over well. The change threw off a lot of customers. We forced them to change to the new version within a day or two of it being released. We struggled to explain why or how to practice affinity therapy with the new app. We had also recently ended the Coach on Demand service, which was the source of the majority of our recurring users. The company had only ever intended for it to be a temporary pilot program. We were essentially subsidizing therapy, and could no longer afford to do so.

Towards the end of my time at Sidekicks, decisions were made to generalize the product more. It's no longer based on the hero-sidekick concept. In the [new version](https://itunes.apple.com/us/app/sidekicks-for-autism/id1021999388?ls=1&mt=8) the child also assumes an avatar, and they see the name of the parent or friend they're talking to instead of the character's name. It resembles more of a traditional chat application instead of the specialized tool that we had previously created.
