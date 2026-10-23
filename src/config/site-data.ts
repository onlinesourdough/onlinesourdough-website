import { familyHref } from "../family/preview";

export type Offer = {
  number: string;
  title: string;
  description: string;
  cta: string;
  status: string;
  href: string;
  image: {
    src: string;
    alt: string;
  };
};

export type StudioOffer = {
  label: string;
  title: string;
  description: string;
  action: string;
  href: string;
  current: boolean;
};

export type AboutBlock =
  | { type: "paragraph" | "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "links"; links: { label: string; href: string }[] }
  | { type: "facts"; rows: { label: string; value: string; href?: string }[] };

export type AboutSection = {
  id: string;
  title: string;
  blocks: AboutBlock[];
};

export const siteData = {
  brand: "onlinesourdough",
  themeStorageKey: "onlinesourdough-theme",
  assets: {
    logo: "/assets/onlinesourdough-mark-large-pixel-v3.svg",
  },
  seo: {
    siteUrl: "https://onlinesourdough.com",
    themeColor: "#f8f2e8",
    title: "Build better ways to work | onlinesourdough",
    description:
      "I help founders and small teams improve their digital business through practical methods, resources, and guided learning.",
    aboutTitle: "About onlinesourdough | My story and method",
    aboutDescription:
      "Methods, templates, courses, and workshops for improving your offer, operations, and demand, with AI where it helps.",
    ogTitle: "Build better ways to work | onlinesourdough",
    ogDescription:
      "I help founders and small teams improve their digital business through practical methods, resources, and guided learning.",
  },
  navigation: {
    offers: "Offers",
    menu: "Menu",
    about: "About",
  },
  redirects: {
    agentWorkReview: {
      destination: "https://resources.onlinesourdough.com/agent-work-review",
      markdownDestination: "https://resources.onlinesourdough.com/agent-work-review.md",
      title: "Agent Work Review has moved | onlinesourdough",
      description: "Agent Work Review now lives in onlinesourdough Resources.",
      eyebrow: "RESOURCE MOVED",
      heading: "Agent Work Review now lives in Resources.",
      body: "You should be redirected automatically. If not, continue to the canonical Resources page.",
      linkLabel: "Continue to Agent Work Review ↗",
    },
  },
  studioOffers: [
    {
      label: "DONE FOR YOU",
      title: "Arc'IT AI",
      description: "IT consulting, architecture, custom software, and ongoing care, from one-off advice to an agreed delivery.",
      action: "Explore offer ↗",
      href: familyHref("arcitai"),
      current: false,
    },
    {
      label: "DIY + DONE WITH YOU",
      title: "onlinesourdough",
      description:
        "Methods, templates, resources, and guided learning for digital business and practical use of AI.",
      action: "Current offer",
      href: "/",
      current: true,
    },
  ] satisfies StudioOffer[],
  page: {
    hero: {
      title: "Build better ways to work",
      description:
        "I help founders and small teams improve their digital business through practical methods, resources, and guided learning. Start with the work that needs improving, then choose the methods and tools that help.",
    },
    menu: {
      ariaLabel: "onlinesourdough menu",
    },
    manifesto: {
      "title": "From one useful change towards more business freedom",
      "cta": "About the method",
      "paragraphs": [
        "I'm Gustav. Through onlinesourdough, I share methods and resources for building better ways to work in a digital business.",
        "The method starts with your offer, operations, and demand. Find the current constraint, choose one useful change, and check what it improves.",
        "Resources supports learning and doing the work yourself. In The Fermentary, you remain the primary builder while I help with decisions, reviews, and difficult parts. The Onlinesourdough Method can support the context and working practices.",
        "Like sourdough, it needs care. You try things, check the quality, time and effort involved, and keep improving the setup. The goal is more control over your time and where you take the business."
      ]
    },
    about: {
      "eyebrow": "ABOUT / MY STORY & METHOD",
      "title": "About onlinesourdough",
      "tagline": "Practical methods and learning for digital business.",
      "paragraphs": [
        "I help founders and small teams improve their digital business through practical methods, resources, and guided learning.",
        "Use Resources to learn and build yourself, or work with me in The Fermentary. For IT consulting, architecture, or a custom software delivery, visit Arc’IT AI."
      ],
      "sections": [
        {
          "id": "why-i-started-onlinesourdough",
          "title": "Why I started onlinesourdough",
          "blocks": [
            {
              "type": "paragraph",
              "text": "I'm Gustav Anderson, a business and software architect. There's a lot of noise around AI."
            },
            {
              "type": "paragraph",
              "text": "So many tools, agents, new models, and ways to set everything up. Every opportunity seems to lead to another choice. It can be hard to tell what actually moves your work forward. What I've been missing is a clear path to follow."
            },
            {
              "type": "paragraph",
              "text": "For me, a setup can be worth choosing because it's easy to get started with and live with. It doesn't have to win every performance comparison. I want it to make useful work more affordable, once you count the tools, the setup, and the time you spend checking and fixing things."
            },
            {
              "type": "paragraph",
              "text": "That's the idea behind onlinesourdough. I want to make the starting point as plug-and-play as possible, with a clear way to make it fit your business. Get something useful working, understand how it works, and build from there."
            },
            {
              "type": "paragraph",
              "text": "I share what I'm trying and learning through gustavonline, my personal brand. And if you'd like my help applying it to your own business, that's what the guidance and implementation are here for."
            },
            {
              "type": "links",
              "links": [
                {
                  "label": "gustavonline",
                  "href": familyHref("gustavonline")
                },
                {
                  "label": "YouTube",
                  "href": "https://www.youtube.com/@gustavonline"
                },
                {
                  "label": "LinkedIn",
                  "href": "https://www.linkedin.com/in/gustavandersonn/"
                },
                {
                  "label": "Open-source projects",
                  "href": "https://github.com/onlinesourdough"
                }
              ]
            }
          ]
        },
        {
          "id": "why-sourdough",
          "title": "Why sourdough?",
          "blocks": [
            {
              "type": "paragraph",
              "text": "I love sourdough. And my girlfriend bakes the best sourdough bread. So there's a bit of home in the name, too."
            },
            {
              "type": "paragraph",
              "text": "A sourdough starter becomes useful through care and practice. I take the same approach to The Onlinesourdough Method: start with a foundation, adapt it to your work, and look after it as you use it. Useful context, clear instructions, and review help you keep improving what comes out of it."
            },
            {
              "type": "paragraph",
              "text": "I use **agentic engineering practices** to give that care a structure. **Context engineering** means giving an agent the information it needs. **Prompt engineering** means making the task and expectations clear. **Harness engineering** is about the tools, permissions, and working environment around the agent."
            },
            {
              "type": "paragraph",
              "text": "Then there's the loop: do the work, check what happened, adjust, and know when to stop. That's what I mean by **loop engineering**. **Evals** are repeatable checks that help you judge whether results meet your requirements and whether a change made things better."
            },
            {
              "type": "paragraph",
              "text": "You don't need to know all those terms to get started. They're part of the thinking behind the resources and the way I work with you. The care matters, and it continues after the first setup."
            }
          ]
        },
        {
          "id": "what-i-mean-by-ai-native",
          "title": "How I approach working with AI",
          "blocks": [
            {
              "type": "paragraph",
              "text": "I start with how your business works day to day. Business architecture helps me understand the people, processes, information, and software involved. I use agentic engineering to decide how agents can contribute to that work, with clear responsibilities and a way to check the result."
            },
            {
              "type": "paragraph",
              "text": "Research, planning, content, administration, software development. You name it. As the tools and models change, I revisit what they can help with. You decide what to delegate, what needs review, and where your own judgment matters."
            }
          ]
        },
        {
          "id": "aios-our-starter-yours-to-build-on",
          "title": "The Onlinesourdough Method",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The Onlinesourdough Method is a reusable starting point for how you work with AI: business context, instructions, and working practices that you can carry into your existing tools. Like a sourdough starter, you adapt it to your setting and look after it as you use it. You keep control of the setup."
            },
            {
              "type": "paragraph",
              "text": "You add what matters about your business, keep useful decisions, and build up instructions and skills you can use again. A skill is a reusable set of instructions for a particular kind of work. Over time, your setup should reflect how you actually want to work."
            },
            {
              "type": "paragraph",
              "text": "I want you to spend less time explaining the same things from scratch. Keep what works, change what doesn't, and understand enough of the setup to stay in control of it."
            },
            {
              "type": "paragraph",
              "text": "Setting it up includes choosing tools and configuring what agents can access and do. You should understand what you've connected and where your approval is needed."
            }
          ]
        },
        {
          "id": "who-onlinesourdough-is-for",
          "title": "Who onlinesourdough is for",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The resources and guidance are especially relevant to:"
            },
            {
              "type": "list",
              "items": [
                "Solo founders building a digital business or software product.",
                "Founders and business leaders working with technology, software, or online services.",
                "Small teams with room to choose and adapt their tools and working practices."
              ]
            },
            {
              "type": "paragraph",
              "text": "Maybe you're unsure which AI setup to choose. Maybe you're explaining your business all over again in every conversation. Or you've tried a few things that looked promising and now want to make them useful in your everyday work."
            }
          ]
        },
        {
          "id": "what-onlinesourdough-offers",
          "title": "What onlinesourdough offers",
          "blocks": [
            {
              "type": "heading",
              "text": "Resources: do it yourself"
            },
            {
              "type": "paragraph",
              "text": "Resources is a growing library of guides, templates, examples, and course material for improving a digital business, with The Onlinesourdough Method and reusable skills where they help. You choose and carry out the work."
            },
            {
              "type": "links",
              "links": [
                {
                  "label": "Explore Resources",
                  "href": "https://resources.onlinesourdough.com/"
                }
              ]
            },
            {
              "type": "heading",
              "text": "The Fermentary: done with you"
            },
            {
              "type": "paragraph",
              "text": "You work on one meaningful business improvement with my guidance. We choose the problem and a useful result, then work through the decisions, practical work, and review together. You remain the primary builder and owner."
            },
            {
              "type": "paragraph",
              "text": "The work can include a personal starting plan, private working sessions, help with difficult technical parts, and relevant Resources or workshops. We use The Onlinesourdough Method when it helps keep your context and decisions useful."
            },
            {
              "type": "paragraph",
              "text": "The programme format and commercial terms are still being finalised. Price, duration, meeting cadence, access, and support boundaries must be clear before a commitment."
            },
            {
              "type": "links",
              "links": [
                {
                  "label": "Explore The Fermentary",
                  "href": "https://app.notion.com/p/3be6d2e17f5680d9958bcf322dcef181"
                }
              ]
            },
            {
              "type": "heading",
              "text": "Complete Bake: agreed work taken off your plate"
            },
            {
              "type": "paragraph",
              "text": "Arc’IT AI is where I deliver IT consulting, architecture, and custom software. Complete Bake is the done-for-you path: I take responsibility for an agreed technical delivery."
            },
            {
              "type": "paragraph",
              "text": "I agree with you on the work I take over, the access I need, how you will accept the result, and who looks after it afterwards. Ongoing operation or support needs its own agreed scope."
            },
            {
              "type": "links",
              "links": [
                {
                  "label": "Explore Complete Bake",
                  "href": familyHref("arcitai")
                }
              ]
            }
          ]
        },
        {
          "id": "how-we-build-an-ai-native-way-of-working",
          "title": "How I help you develop a way of working that fits",
          "blocks": [
            {
              "type": "heading",
              "text": "Understand how the business actually works"
            },
            {
              "type": "paragraph",
              "text": "I use business architecture to understand what you offer, how you deliver it, and how the people, processes, information, and software fit together. I help you choose work worth improving and decide how to evaluate the result: quality, time, cost, or another measure that matters to your business."
            },
            {
              "type": "heading",
              "text": "Establish the smallest useful foundation"
            },
            {
              "type": "paragraph",
              "text": "I use The Onlinesourdough Method as a starter for the context and working practices. I help you adapt it to your business and choose enough tools, instructions, and access for the first useful task. I make the permissions and approval points clear."
            },
            {
              "type": "heading",
              "text": "From business problem to working solution"
            },
            {
              "type": "paragraph",
              "text": "Through pair engineering, I help you plan, build, and review a change in real work. I use agentic engineering practices where agents can help, and keep human judgment and responsibility clear. Tests and review check the result. Sometimes the useful change is to simplify a process."
            },
            {
              "type": "heading",
              "text": "Keep what works and improve it"
            },
            {
              "type": "paragraph",
              "text": "I review the result with you against the starting point and the agreed criteria, including the effort spent checking and fixing it. I put useful learning back into the setup. The aim is progress you can assess in practice and more control over how you work."
            }
          ]
        },
        {
          "id": "where-arc-it-ai-fits",
          "title": "Where Arc’IT AI fits",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Arc’IT AI handles deeper IT work: one-off consultation, architecture, custom apps, integrations, and ongoing care. You can ask for technical advice or an agreed software delivery."
            },
            {
              "type": "paragraph",
              "text": "Factory is a separate set of engineering methods behind that delivery. It supports how software is built and reviewed. You do not need to adopt The Onlinesourdough Method to work with Arc’IT AI."
            },
            {
              "type": "links",
              "links": [{ "label": "Explore Arc’IT AI", "href": familyHref("arcitai") }]
            }
          ]
        },
        {
          "id": "what-working-together-looks-like",
          "title": "What working together looks like",
          "blocks": [
            {
              "type": "paragraph",
              "text": "I start with your business and how you'd like to work. Bring the thing that's slowing you down, the setup you're already using, or simply the feeling that you need a clearer place to start."
            },
            {
              "type": "paragraph",
              "text": "You work directly with me. In The Fermentary, you do the work with help on decisions, reviews, and difficult parts. I agree scope, responsibilities, timing, and what useful progress looks like with you before starting."
            }
          ]
        },
        {
          "id": "key-facts",
          "title": "Key facts",
          "blocks": [
            {
              "type": "facts",
              "rows": [
                {
                  "label": "Name",
                  "value": "onlinesourdough"
                },
                {
                  "label": "What it is",
                  "value": "Methods, resources, and learning for digital business"
                },
                {
                  "label": "Who you work with",
                  "value": "Me, Gustav Anderson, business and software architect"
                },
                {
                  "label": "Audience",
                  "value": "Solo founders, business leaders, and small teams, especially those working with technology or online business"
                },
                {
                  "label": "Starting point",
                  "value": "One business constraint and a useful improvement"
                },
                {
                  "label": "Ways to work",
                  "value": "Resources for self-directed learning, The Fermentary for guided work, and Arc’IT AI for done-for-you delivery"
                },
                {
                  "label": "Larger organisational delivery",
                  "value": "Arc’IT AI"
                },
                {
                  "label": "Public writing and learning",
                  "value": "gustavonline"
                },
                {
                  "label": "Website",
                  "value": "onlinesourdough.com",
                  "href": "/"
                }
              ]
            }
          ]
        },
        {
          "id": "frequently-asked-questions",
          "title": "Frequently asked questions",
          "blocks": [
            {
              "type": "heading",
              "text": "Do I need to know how to code?"
            },
            {
              "type": "paragraph",
              "text": "You can start by explaining your business and the work you want help with. The technical knowledge needed depends on the tasks and how much of the setup or implementation you want to do yourself."
            },
            {
              "type": "heading",
              "text": "Is this tied to one AI tool?"
            },
            {
              "type": "paragraph",
              "text": "The approach starts with your business and working methods. I choose tools with you for the work and aim to keep your context and methods portable, so the setup can evolve as your needs and the available tools change."
            },
            {
              "type": "heading",
              "text": "Should I automate everything?"
            },
            {
              "type": "paragraph",
              "text": "No. Some work benefits from AI assistance, some can be automated, and some needs a person. The important decisions are who does the work, how it is checked, and whether the overall result is useful."
            },
            {
              "type": "heading",
              "text": "How are onlinesourdough, gustavonline, and Arc’IT AI connected?"
            },
            {
              "type": "paragraph",
              "text": "I’m behind all three. Gustav Online is my personal record of work and learning. onlinesourdough offers methods, resources, and guided learning. Arc’IT AI delivers IT consulting, architecture, and custom software."
            }
          ]
        },
        {
          "id": "find-your-starting-point",
          "title": "Find your starting point",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Explore the free resources, or work with me to establish a setup and way of working that fits your business."
            },
            {
              "type": "links",
              "links": [
                {
                  "label": "Explore the ways to work",
                  "href": "/#menu"
                }
              ]
            }
          ]
        }
      ] satisfies AboutSection[],
      "backLabel": "Back to menu"
    },

  },
  offers: [
    {
      number: "01",
      title: "Content",
      description: "I write my newsletter and record videos on business architecture, software, and agentic engineering, sharing lessons and real examples.",
      cta: "Explore content",
      status: "Public",
      href: "https://www.youtube.com/@gustavonline",
      image: {
        src: "/assets/content-lofi-v3-transparent.png",
        alt: "Pixel-art publishing desk with a sourdough starter jar",
      },
    },
    {
      number: "02",
      title: "Resources",
      description:
        "Guides, templates, examples, and course material to help you improve your digital business and do the work yourself.",
      cta: "Open library",
      status: "DIY",
      href: "https://resources.onlinesourdough.com",
      image: {
        src: "/assets/resources-lofi-v3-transparent.png",
        alt: "Pixel-art archive folder with bread lame and dough scraper",
      },
    },
    {
      number: "03",
      title: "The Fermentary",
      description:
        "I work 1:1 with you on business decisions, workflows, and software. I use pair engineering and The Onlinesourdough Method as a starter to develop what fits your business.",
      cta: "Work with me",
      status: "DWY",
      href: "https://app.notion.com/p/3be6d2e17f5680d9958bcf322dcef181",
      image: {
        src: "/assets/inner-circle-lofi-v3-transparent.png",
        alt: "Pixel-art shared worktable with coffee and a slice of sourdough",
      },
    },
    {
      number: "04",
      title: "Complete Bake",
      description:
        "Custom software, apps, and integrations delivered through Arc’IT AI, with an agreed scope and clear responsibility.",
      cta: "Start a project",
      status: "DFY",
      href: familyHref("arcitai"),
      image: {
        src: "/assets/complete-bake-lofi-v3-transparent.png",
        alt: "Pixel-art computer, server, and oven with bread",
      },
    },
  ] satisfies Offer[],
  footer: {
    github: {
      label: "GitHub",
      href: "https://github.com/gustavonline",
    },
    links: [
      {
        label: "gustavonline ↗",
        href: "https://gustavonline.com",
      },
      {
        label: "Arc'IT AI ↗",
        href: familyHref("arcitai"),
      },
    ],
  },
};
