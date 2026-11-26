import { familyHref } from "../family/preview";

export const fermentaryBrochureUrl = "https://app.notion.com/p/3be6d2e17f5680d9958bcf322dcef181";
export const fermentarySignupUrl = "/fermentary/details";
export const fermentaryFormAction = "https://app.kit.com/forms/10082012/subscriptions";
const fermentaryContactBody = [
  "Hi Gustav,", "",
  "I would like to explore working together in The Fermentary.", "",
  "1. My business and what I would like help with first:", "",
  "2. The tools I use today:", "",
  "3. The session level and start date I am considering:", "",
].join("\r\n");
export const fermentaryContactUrl = "mailto:hello@gustavonline.com?subject="
  + encodeURIComponent("The Fermentary") + "&body=" + encodeURIComponent(fermentaryContactBody);
const fermentaryHref = "/fermentary";
const fermentaryGettingStartedAnswer = "Read the brochure, then send me a few lines by email, LinkedIn or X about your business, what you would like help with, the tools you use and when you would like to start. We agree the session level and practical arrangements in writing. There is no minimum term, so you can start with one month. Our first meeting is your onboarding, where we map your business and agree a first roadmap. We can arrange a short conversation if it helps clarify something.";

export const methodFaqs = [
  {
    "question": "How do we get started with The Fermentary?",
    "answer": fermentaryGettingStartedAnswer
  },
  {
    "question": "Do I need to know how to code?",
    "answer": "No. AI agents can write much of the code involved. Your knowledge of the business gives that work direction. We focus on the data and context AI needs, and you choose how much of the technical work to take on yourself."
  },
  {
    "question": "Will I need to change my tools?",
    "answer": "We start with the tools and environment you already use. If you replace a system later, the setup and any affected workflows need adapting and testing. Your data and context give you something to build on through that change. The foundation stays in your environment, with access you control."
  },
  {
    "question": "Should I automate everything?",
    "answer": "No. Some work benefits from AI assistance, some can be automated, and some needs a person. The important decisions are who does the work, how it is checked, and whether the overall result is useful."
  },
  {
    "question": "How are onlinesourdough, gustavonline, and Arc’IT AI connected?",
    "answer": "I am behind all three. gustavonline is where I share my work and learning. onlinesourdough offers Resources and ongoing 1:1 collaboration for founders and small teams. Arc’IT AI is where I take care of custom data and AI projects. All three start with the same idea: AI needs data and context about the business it is helping."
  },
  {
    "question": "What does The Fermentary cost?",
    "answer": "The brochure sets out current USD and DKK pricing, session levels and practical terms, with no minimum term."
  }
];

export const fermentaryPage = {
  title: "The Fermentary | onlinesourdough",
  heading: "Build something useful with AI. Learn to keep it going.",
  introduction: "Bring a piece of work you want to improve. In ongoing 1:1 sessions, we organise the data and context AI needs, put it to work in your environment and review the result together.",
  video: {
    youtubeId: "",
    title: "The Fermentary: making data and AI useful in your business",
    poster: "/assets/inner-circle-lofi-v3-transparent.png",
    pendingTitle: "Video coming soon",
    pendingDescription: "A walkthrough of the approach and how we work together.",
  },
  cta: "More info, terms & pricing",
  closing: "Read the brochure for pricing and terms. There is no minimum term, so you can start with one month and continue only if it is useful. We clarify your goals and agree the practical arrangements by email before your onboarding.",
  contactLabel: "Email me about The Fermentary",
  whyTitle: "From scattered data to shared context",
  why: "Data is the information in your documents, messages and systems. Context explains what it means in your business: how you work, what matters and why you do things a certain way.",
  example: "Say you want a better way to follow up on customer enquiries. We can start with the messages, your priorities and the rules you use to decide who should reply. You can review what AI prepares, improve the setup and use the same foundation on the next piece of work.",
  steps: [
    {
      title: "Map your business",
      description: "You show me your current setup. We map your data and context and identify what is missing.",
    },
    {
      title: "Build the foundation",
      description: "We bring the relevant data and context together in your existing environment, organised so AI can use it and you stay in control of it.",
    },
    {
      title: "Keep it useful",
      description: "We review the work, keep context current and document the setup so you can use and develop it yourself. When a system changes, you can see what depends on it and what needs testing.",
    },
  ],
  founder: "I am Gustav, the founder of onlinesourdough. I work with you on the data and context behind your business, so AI has a foundation it can use.",
  portrait: "/assets/gustav-linkedin-portrait.jpg",
  included: ["Personal onboarding and an agreed roadmap", "Ongoing 1:1 working sessions", "Direct 1:1 communication in a private channel for advice and feedback between sessions", "Hands-on help putting your data and context to use", "Full Resources access during the collaboration and for 30 days after the agreed end date for new agreements"],
  fit: "For founders and small teams, including those without a technical background. You bring your knowledge of the business and time between sessions. AI can help with the technical work, and we build and review together so you can learn to use the foundation yourself.",
  faqTitle: "Questions before you start",
  faqs: [
    {
      question: "How do we get started?",
      answer: fermentaryGettingStartedAnswer,
    },
    {
      question: "What happens between sessions?",
      answer: "You work on the agreed next steps, with written advice and feedback from me and full access to Resources.",
    },
    ...methodFaqs.filter(({ question }) => [
      "Do I need to know how to code?",
      "Will I need to change my tools?",
    ].includes(question)),
    {
      question: "Who owns the foundation?",
      answer: "You do. It lives in your own environment, and you decide what AI can access.",
    },
    {
      question: "Will I need to keep working with you?",
      answer: "The setup and notes stay with you. We build in your environment and document the work so you, your team or someone you choose can continue it. Further help is your choice.",
    },
  ],
};

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

export const heroVariations = [
  {
    "title": "Valuable AI starts with your data and business context",
    "description": "I help founders and small teams build a data and context foundation AI can use. We start with how your business runs and the tools and environment you already have, so you can use AI across more of your business."
  },
  {
    "title": "Start with what you know. Let AI help with the work.",
    "description": "I help founders and small teams build a data and context foundation AI can use. We start with how your business runs and the tools and environment you already have, so you can use AI across more of your business."
  },
  {
    "title": "Teach AI how your business works",
    "description": "I help founders and small teams build a data and context foundation AI can use. We start with how your business runs and the tools and environment you already have, so you can use AI across more of your business."
  },
  {
    "title": "Useful AI, shaped around how you work",
    "description": "I help founders and small teams build a data and context foundation AI can use. We start with how your business runs and the tools and environment you already have, so you can use AI across more of your business."
  }
];

const homeHero = {
  title: "Build what your business needs with AI",
  description:
    "For founders and small teams. Turn what you know about your business into tools and workflows you can keep improving.",
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
    title: `${homeHero.title} | onlinesourdough`,
    description: homeHero.description,
    aboutTitle: "Useful foundations for working with data and AI | onlinesourdough",
    aboutDescription:
      "The thinking behind onlinesourdough: business context, practical AI and ongoing collaboration for founders and small teams.",
    ogTitle: `${homeHero.title} | onlinesourdough`,
    ogDescription: homeHero.description,
  },
  navigation: {
    offers: "Offers",
    menu: "Menu",
    about: "About",
  },
  studioOffers: [
    {
      label: "CONSULTANCY & PROJECTS",
      title: "Arc'IT AI",
      description: "Data and AI consultancy, with advice and custom projects shaped around your business.",
      action: "Explore offer",
      href: familyHref("arcitai"),
      current: false,
    },
    {
      label: "RESOURCES & 1:1 COLLABORATION",
      title: "onlinesourdough",
      description:
        "Practical resources and ongoing 1:1 collaboration for founders and small teams who want AI to understand and help with their work.",
      action: "Current offer",
      href: "/",
      current: true,
    },
  ] satisfies StudioOffer[],
  page: {
    hero: homeHero,
    menu: {
      ariaLabel: "onlinesourdough menu",
    },
    manifesto: {
      "title": "Start with a piece of work you know well",
      "cta": "About the method",
      "paragraphs": [
        "Say you want to turn customer enquiries into a weekly list of follow-ups. The enquiries are your data. What counts as urgent, who should reply and what a good response looks like are your business context.",
        "Give AI that context and it can help prepare a list you can review. As you notice what it gets right and where it needs more guidance, you can improve the setup and reuse what you have learned in other parts of the business.",
        "I am Gustav. Start on your own with Resources, or bring a piece of work to The Fermentary and we will build the first version together."
      ]
    },
    about: {
      "title": "Useful foundations for working with data and AI.",
      "paragraphs": [
        "Pick a piece of work you want to improve. Bring the data and what you know about how the work is done, then use AI to help build or improve something you can check yourself.",
        "Start on your own with Resources, or bring the work to The Fermentary and we will build and review it together."
      ],
      "sections": [
        {
          "id": "why-i-started-onlinesourdough",
          "title": "Why I started onlinesourdough",
          "blocks": [
            {
              "type": "paragraph",
              "text": "I am Gustav, the founder of onlinesourdough. I share practical ways to make data and AI useful in your business."
            },
            {
              "type": "paragraph",
              "text": "New tools and models arrive all the time. Useful help depends on AI having data and context about your business: your customers, your priorities and how the work is done. That is the starting point I want to make clearer."
            },
            {
              "type": "paragraph",
              "text": "For me, a setup can be worth choosing because it is easy to get started with and live with. It does not have to win every performance comparison. I want it to make useful work more affordable, once you count the tools, the setup, and the time you spend checking and fixing things."
            },
            {
              "type": "paragraph",
              "text": "That is the idea behind onlinesourdough. Bring what you already know about your business into the work, make it useful to AI and build from there. Your setup should become easier to use and better suited to you as you learn."
            },
            {
              "type": "paragraph",
              "text": "I share what I am trying and learning through gustavonline. onlinesourdough is where you can use the resources yourself or work with me to apply the approach to your own business."
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
              "text": "I love sourdough. And my girlfriend bakes the best sourdough bread. So there is a bit of home in the name, too."
            },
            {
              "type": "paragraph",
              "text": "A sourdough starter becomes useful through care and practice. I take the same approach to working with AI: start with a useful foundation, adapt it to your work and keep it current as the business changes."
            },
            {
              "type": "paragraph",
              "text": "Your business data becomes more useful when its meaning is clear. Context tells AI how the business works, what matters and what you expect from a result. We bring those things together around the work you want help with."
            },
            {
              "type": "paragraph",
              "text": "Then we put it to use, review what comes back and improve what was missing. A useful correction becomes part of the next task, so you spend less time explaining the same things again."
            },
            {
              "type": "paragraph",
              "text": "That is the role of **agentic engineering** here: a practical way to organise the work, give agents the information and access they need, and check the result. The care continues after the first setup."
            }
          ]
        },
        {
          "id": "what-i-mean-by-ai-native",
          "title": "How I approach working with AI",
          "blocks": [
            {
              "type": "paragraph",
              "text": "We start with how your business works and what AI needs to know to help. That means understanding your business data, the context around it and the decisions that still belong to you. The relevant information matters more than how much you have."
            },
            {
              "type": "paragraph",
              "text": "That foundation can support research, planning, content, administration or building your own software. We decide what to delegate, what needs review and how to tell whether the result is useful. AI can help you organise the information as you go."
            }
          ]
        },
        {
          "id": "aios-our-starter-yours-to-build-on",
          "title": "The Onlinesourdough Method",
          "blocks": [
            {
              "type": "paragraph",
              "text": "The Onlinesourdough Method brings together the foundation your AI assistant needs: relevant data, business context and reusable ways of working. Data is the material in your documents, notes and systems. Context explains how your business works and what matters. Skills guide how the assistant plans, creates and checks its work."
            },
            {
              "type": "paragraph",
              "text": "Your data stays in its existing systems. You keep useful context, decisions and personal methods in a home you choose, and give the assistant access to the sources each task needs. The OSM plugin adds shared skills in the AI app you already use. Installing it does not connect every account or grant access to all your data."
            },
            {
              "type": "paragraph",
              "text": "I want you to spend less time explaining the same things from scratch. Keep what works, change what does not, and understand enough of the setup to stay in control of it."
            },
            {
              "type": "paragraph",
              "text": "Setting it up includes choosing tools and configuring what agents can access and do. You should understand what you have connected and where your approval is needed."
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
                "Founders who want help with the work they currently carry themselves.",
                "Independent professionals turning their experience and working methods into useful AI assistance.",
                "Small teams who want shared context, clearer working methods and tools they can adapt."
              ]
            },
            {
              "type": "paragraph",
              "text": "Maybe you are unsure which AI setup to choose. Maybe you are explaining your business all over again in every conversation. Or you have tried a few things that looked promising and now want to make them useful in your everyday work."
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
              "text": "Resources covers what I think is worth understanding to work well with data and AI. Practical guides and methods help you build useful business context, make informed decisions and apply the approach yourself. Personal guidance and review are part of The Fermentary."
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
              "text": "The Fermentary: an ongoing 1:1 collaboration"
            },
            {
              "type": "paragraph",
              "text": "We work together to make data and AI useful in your business. We get to know the work, develop the data and context it needs and build a shared roadmap. Ongoing 1:1 sessions give us time to make decisions and develop useful solutions, with written advice and feedback between them."
            },
            {
              "type": "paragraph",
              "text": "The collaboration starts with personal onboarding and a shared understanding of your business. You also have full Resources access, including new material during our work together. We put what you learn into practice, build and review together, and agree the next steps for your work between sessions."
            },
            {
              "type": "paragraph",
              "text": "We agree how often to meet, the work we take on and the support between sessions. The brochure sets out current USD and DKK pricing, session levels and practical terms, with no minimum term."
            },
            {
              "type": "links",
              "links": [
                {
                  "label": "Explore The Fermentary",
                  "href": fermentaryHref
                }
              ]
            },
            {
              "type": "heading",
              "text": "Complete Bake: done for you"
            },
            {
              "type": "paragraph",
              "text": "For work you would like me to take care of, Arc’IT AI offers custom data and AI projects. We agree the brief and the outcome, then I bring the work from idea to a solution you can use. The scope follows your business and what the project needs."
            },
            {
              "type": "paragraph",
              "text": "Explore one-off consultation and custom projects on Arc’IT AI. Each project has an agreed scope, review and handover so you can use and build on the result, with further support when it is useful."
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
              "text": "We look at what you offer, who you serve and how the work gets done. Together we choose something worth improving and a way to judge the result, whether that is time, quality, cost or a decision you can make with more confidence."
            },
            {
              "type": "heading",
              "text": "Establish the smallest useful foundation"
            },
            {
              "type": "paragraph",
              "text": "We map the relevant data and context in your existing notes, documents and systems. We make their meaning clear, then agree what AI can access and do. The Onlinesourdough Method gives this work a structure."
            },
            {
              "type": "heading",
              "text": "From business problem to working solution"
            },
            {
              "type": "paragraph",
              "text": "We work with your data and context directly. That may mean preparing a client handover, reviewing what AI produces or developing your own software. In sessions, we make decisions, build, test and review together, then agree what you will work on between sessions."
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
              "text": "Arc’IT AI is where I take on custom data and AI projects. The starting point is the same: understand the business, bring the relevant data and context together, then put AI to useful work. You can start with a free 20-minute consultation or discuss a project."
            },
            {
              "type": "paragraph",
              "text": "Agentic Systems is an open-source framework for building and operating agentic systems across software development, BI, security and research. onlinesourdough brings the same attention to context and review into Resources and ongoing work with founders and small teams. The setup follows what the work needs."
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
              "text": "I start with your business and how you would like to work. Bring the thing that is slowing you down, the setup you are already using, or simply the feeling that you need a clearer place to start."
            },
            {
              "type": "paragraph",
              "text": "You work directly with me. We build an understanding of your business over time and use each session for the decisions, practical work and review that matter now. Between sessions, you continue with the resources, roadmap and written support we agree."
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
                  "value": "Resources and ongoing collaboration to put AI to work in your business"
                },
                {
                  "label": "Who you work with",
                  "value": "Me, Gustav Anderson, founder of onlinesourdough"
                },
                {
                  "label": "Audience",
                  "value": "Founders, independent professionals and small teams"
                },
                {
                  "label": "Starting point",
                  "value": "Your business knowledge, data and context"
                },
                {
                  "label": "Ways to work",
                  "value": "Resources for independent work; The Fermentary for ongoing 1:1 collaboration"
                },
                {
                  "label": "Custom projects, done for you",
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
          "blocks": methodFaqs.flatMap(({ question, answer }) => [
            { type: "heading" as const, text: question },
            { type: "paragraph" as const, text: answer },
          ])
        },
        {
          "id": "find-your-starting-point",
          "title": "Find your starting point",
          "blocks": [
            {
              "type": "paragraph",
              "text": "Explore Resources to get started yourself, or read the brochure for an ongoing 1:1 collaboration. Bring what you know about your business and the work you already have."
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
      description: "Find an idea worth trying. See how I use data and AI in my own business and pick something you can adapt to yours.",
      cta: "Watch on YouTube",
      status: "Follow along",
      href: "https://www.youtube.com/@gustavonline",
      image: {
        src: "/assets/content-lofi-v3-transparent.png",
        alt: "Codex and Claude Code working with orange data tiles on a publishing desk",
      },
    },
    {
      number: "02",
      title: "Resources",
      description:
        "Try AI on a real task yourself. Use guides, methods and tools to organise what it needs to know about your business.",
      cta: "Explore Resources",
      status: "Do it yourself",
      href: "https://resources.onlinesourdough.com",
      image: {
        src: "/assets/resources-lofi-v3-transparent.png",
        alt: "Codex and Claude Code peeking from a folder of resources",
      },
    },
    {
      number: "03",
      title: "The Fermentary",
      description:
        "Build a setup you can keep improving. In ongoing 1:1 sessions, we organise your data and business context and put it to work together.",
      cta: "Explore The Fermentary",
      status: "Done with you",
      href: fermentaryHref,
      image: {
        src: "/assets/inner-circle-lofi-v3-transparent.png",
        alt: "Codex and Claude Code tending a sourdough starter and arranging data tiles around a shared worktable",
      },
    },
    {
      number: "04",
      title: "Complete Bake",
      description:
        "Put a working solution into use. Bring the problem you want solved, and Arc’IT AI takes care of the agreed project from scoping to rollout.",
      cta: "Explore custom projects",
      status: "Done for you",
      href: familyHref("arcitai"),
      image: {
        src: "/assets/complete-bake-lofi-v3-transparent.png",
        alt: "Workshop with a warm oven, Codex on the computer and Claude Code working on the server",
      },
    },
  ] satisfies Offer[],
  footer: {
    menuCredit: {
      prefix: "Inspired by",
      name: "Frederik Pahuus",
      href: "https://www.youtube.com/@FrederikPahuus",
    },
    fermentaryCredit: {
      prefix: "Thanks",
      name: "Andreas Elmstrøm",
      href: "https://www.youtube.com/@AndreasElmstrom",
      suffix: "for the inspiration.",
      italic: true,
    },
    github: {
      label: "GitHub",
      href: "https://github.com/gustavonline",
    },
    links: [
      {
        label: "gustavonline",
        href: "https://gustavonline.com",
      },
      {
        label: "Arc'IT AI",
        href: familyHref("arcitai"),
      },
    ],
  },
};
