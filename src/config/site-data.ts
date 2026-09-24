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
    founderPortrait: "/assets/gustav-github.png",
  },
  seo: {
    siteUrl: "https://onlinesourdough.com",
    themeColor: "#f8f2e8",
    title: "Build the business you want to run. | onlinesourdough",
    description:
      "onlinesourdough helps solo founders, business leaders, and small teams find a way of working with AI that makes sense for their business.",
    aboutTitle: "About onlinesourdough | Our story and method",
    aboutDescription:
      "Meet Gustav Anderson and explore onlinesourdough: free resources, AIOS, and hands-on guidance for an AI-native way of working.",
    ogTitle: "Build the business you want to run. | onlinesourdough",
    ogDescription:
      "onlinesourdough helps solo founders, business leaders, and small teams find a way of working with AI that makes sense for their business.",
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
      description: "Software, security, and agreed delivery and operational responsibility.",
      action: "Explore offer ↗",
      href: "https://arcitai.com",
      current: false,
    },
    {
      label: "DIY + DONE WITH YOU",
      title: "onlinesourdough",
      description:
        "Free resources, AIOS, and hands-on guidance for an AI-native way of working.",
      action: "Current offer",
      href: "/",
      current: true,
    },
  ] satisfies StudioOffer[],
  page: {
    hero: {
      title: "Build the business you want to run.",
      description:
        "onlinesourdough helps solo founders, business leaders, and small teams find a way of working with AI that makes sense for their business. I've shaped the same approach into different offers: free resources and AIOS to get started, The Fermentary to build alongside me, and Complete Bake for a solution delivered for you.",
    },
    menu: {
      ariaLabel: "onlinesourdough menu",
    },
    manifesto: {
      "title": "From one useful change towards more business freedom",
      "cta": "About the method",
      "paragraphs": [
        "I'm Gustav. With so many AI tools, agents, and ways to set things up, I've been missing a clear path to follow. That's the idea behind onlinesourdough.",
        "AIOS is our starter, yours to build on. It brings your business context and reusable ways of working together, so you can spend less time starting from scratch.",
        "Through free resources and hands-on guidance, we work on making AI useful in your everyday business. That can mean content, research, software, or another part of your work.",
        "Like sourdough, it needs care. You try things, check the results, and keep improving the setup. The goal is more control over your time and where you take the business."
      ]
    },
    about: {
      "eyebrow": "ABOUT / OUR STORY & METHOD",
      "title": "About onlinesourdough",
      "tagline": "A practical starting point for an AI-native business.",
      "paragraphs": [
        "onlinesourdough helps solo founders, business leaders, and small teams find a way of working with AI that makes sense for their business.",
        "Here you'll find free resources, AIOS, and the option to work with me on putting it all to use. A place to start, and something you can keep building on."
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
                  "label": "Gustav Online",
                  "href": "https://gustavonline.com/"
                },
                {
                  "label": "YouTube",
                  "href": "https://www.youtube.com/@gustavonline"
                },
                {
                  "label": "LinkedIn",
                  "href": "https://www.linkedin.com/in/gustavonline/"
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
              "text": "I see something similar in working with AI. You can play around and try things, but you also need to look after what you're working with. A starter needs feeding and attention. An AI setup needs useful context, clear instructions, and someone checking how it's doing."
            },
            {
              "type": "paragraph",
              "text": "Some of that care has technical names. **Context engineering** means giving the AI the information it actually needs. **Prompt engineering** means making the task and expectations clear. **Harness engineering** is about the tools, permissions, and working environment around the agent."
            },
            {
              "type": "paragraph",
              "text": "Then there's the loop: do the work, check what happened, adjust, and know when to stop. That's what I mean by **loop engineering**. **Evals** help us check whether the results meet the requirements and whether a change actually made things better."
            },
            {
              "type": "paragraph",
              "text": "You don't need to know all those terms to get started. They're part of the thinking behind the resources and the way I work with you. The care matters, and it continues after the first setup."
            }
          ]
        },
        {
          "id": "what-i-mean-by-ai-native",
          "title": "What I mean by AI-native",
          "blocks": [
            {
              "type": "paragraph",
              "text": "For me, becoming AI-native means making AI a useful part of how your business works day to day. The people and agents involved need the right context, clear responsibilities, and a way to check the work."
            },
            {
              "type": "paragraph",
              "text": "Research, planning, content, administration, software development. You name it. As the tools and models change, we can revisit what they can help with. You decide what to delegate, what needs review, and where your own judgment matters."
            }
          ]
        },
        {
          "id": "aios-our-starter-yours-to-build-on",
          "title": "AIOS: our starter, yours to build on",
          "blocks": [
            {
              "type": "paragraph",
              "text": "AIOS is the starter I use for bringing business context and ways of working with AI together. We take that starting point and make it yours."
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
              "text": "Start with the free explanations, guides, and examples. They're there to help you understand AI, get set up, and find ways to use it in your own work. Take what you need and come back as you build on it."
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
              "text": "This is where we work on becoming AI-native together. We start with your business and build a setup and working habits that fit the work you actually do."
            },
            {
              "type": "paragraph",
              "text": "That often includes AIOS. It can also mean a content workflow, reusable skills, research, or another area where you want AI to help. I work with you on the setup, the decisions, and the difficult parts, and we review how it works in practice."
            },
            {
              "type": "paragraph",
              "text": "Relevant factory resources can be included when your work calls for them. We agree on the guidance, implementation, and ongoing responsibility involved as your needs develop."
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
              "text": "Sometimes you'd like me to take a piece of work off your plate. We can agree on that as part of working together, or through a larger delivery with Arc’IT AI."
            },
            {
              "type": "paragraph",
              "text": "We agree on what I take over, how the result will be accepted, and any ongoing operation or support. Done-for-you describes that responsibility."
            },
            {
              "type": "links",
              "links": [
                {
                  "label": "Explore Complete Bake",
                  "href": "https://arcitai.com/"
                }
              ]
            }
          ]
        },
        {
          "id": "how-we-build-an-ai-native-way-of-working",
          "title": "How we build an AI-native way of working",
          "blocks": [
            {
              "type": "heading",
              "text": "Understand how the business actually works"
            },
            {
              "type": "paragraph",
              "text": "We look at what you offer, how you deliver it, and how customers find and choose you. Where does information live? Who makes the decisions? What keeps landing back on your plate? The setup needs to make sense for that business."
            },
            {
              "type": "heading",
              "text": "Establish the smallest useful foundation"
            },
            {
              "type": "paragraph",
              "text": "We start with enough to do useful work, with room to grow. AIOS helps organise the context and working methods. We choose the tools and set up access and permissions around the work they'll do."
            },
            {
              "type": "heading",
              "text": "From business problem to working solution"
            },
            {
              "type": "paragraph",
              "text": "We apply the setup to real work and decide how people and agents should share it. Clear instructions, relevant context, and review help turn experiments into repeatable practice. Sometimes that also reveals a process we should simplify before adding more technology."
            },
            {
              "type": "heading",
              "text": "Keep what works and improve it"
            },
            {
              "type": "paragraph",
              "text": "We look at what worked, what it cost in time and effort, and what needs changing. Then we put that learning back into the setup. That's the ongoing care again. The point is to give you more control over your time and where you take the business."
            }
          ]
        },
        {
          "id": "where-arc-it-ai-fits",
          "title": "Where Arc’IT AI fits",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Arc’IT AI focuses on larger organisations and more involved delivery, where software engineering, security, team access, and ongoing operation need a tailored approach. It is also where I take responsibility for agreed implementation and operational work."
            },
            {
              "type": "paragraph",
              "text": "The factory work I'm developing through Arc’IT AI has two connected areas:"
            },
            {
              "type": "list",
              "items": [
                "**Agent Software Factory:** a structured development process where agents work from requirements through implementation, tests, review, and controlled release. Security and code quality are built into the intended workflow.",
                "**Agent Defense Factory:** the follow-on work of protecting software in operation, including monitoring, assessing vulnerabilities, handling patches, and preparing for incidents and recovery."
              ]
            },
            {
              "type": "paragraph",
              "text": "This factory work is in development, with more demanding organisational needs in mind. Relevant factory resources can also be used through onlinesourdough and The Fermentary. Access to a resource and responsibility for operating it are agreed separately."
            },
            {
              "type": "paragraph",
              "text": "AIOS supports the broader daily way of working. The factory is designed to operate independently, and the two can complement each other where useful."
            }
          ]
        },
        {
          "id": "what-working-together-looks-like",
          "title": "What working together looks like",
          "blocks": [
            {
              "type": "paragraph",
              "text": "We start with your business and how you'd like to work. Bring the thing that's slowing you down, the setup you're already using, or simply the feeling that you need a clearer place to start."
            },
            {
              "type": "paragraph",
              "text": "We agree on the scope, responsibilities, and what useful progress looks like. We also agree on communication, timing, and any ongoing support. You work directly with me."
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
                  "value": "A practical way to establish and improve how a business works with AI"
                },
                {
                  "label": "Created by",
                  "value": "Gustav Anderson, business and software architect"
                },
                {
                  "label": "Audience",
                  "value": "Solo founders, business leaders, and small teams, especially those working with technology or online business"
                },
                {
                  "label": "Starting point",
                  "value": "AIOS, adapted to the business and its working environment"
                },
                {
                  "label": "Ways to work",
                  "value": "Free Resources, The Fermentary for done-with-you guidance, and Complete Bake for agreed done-for-you responsibility"
                },
                {
                  "label": "Larger organisational delivery",
                  "value": "Arc’IT AI"
                },
                {
                  "label": "Public writing and learning",
                  "value": "Gustav Online"
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
              "text": "The approach starts with your business and working methods. We choose tools for the work and aim to keep your context and methods portable, so the setup can evolve as your needs and the available tools change."
            },
            {
              "type": "heading",
              "text": "Does AI-native mean automating everything?"
            },
            {
              "type": "paragraph",
              "text": "No. Some work benefits from AI assistance, some can be automated, and some needs a person. The important decisions are who does the work, how it is checked, and whether the overall result is useful."
            },
            {
              "type": "heading",
              "text": "How are onlinesourdough, Gustav Online, and Arc’IT AI connected?"
            },
            {
              "type": "paragraph",
              "text": "Gustav Anderson is behind all three. Gustav Online is where I share what I’m working on and learning. onlinesourdough brings together free resources and practical guidance, while Arc’IT AI focuses on more involved organisational delivery and agreed responsibility."
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
      description: "Ideas, experiments, and real examples for connecting business, software, and AI.",
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
        "Free guides and examples to help you understand AI, get set up, and put it to use in your own work.",
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
        "Build an AI-native way of working with Gustav, from AIOS to content workflows, skills, and the setup your business needs.",
      cta: "Work together",
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
        "Let Gustav take agreed work off your plate, alongside guidance or through a larger delivery with Arc’IT AI.",
      cta: "Start a project",
      status: "DFY",
      href: "https://arcitai.com",
      image: {
        src: "/assets/complete-bake-lofi-v3-transparent.png",
        alt: "Pixel-art computer, server, and oven with bread",
      },
    },
  ] satisfies Offer[],
  footer: {
    copyright: "© 2026 onlinesourdough",
    github: {
      label: "GitHub",
      href: "https://github.com/onlinesourdough",
    },
    links: [
      {
        label: "gustavonline ↗",
        href: "https://gustavonline.com",
      },
      {
        label: "Arc'IT AI ↗",
        href: "https://arcitai.com",
      },
    ],
  },
};
