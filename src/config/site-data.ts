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
      "I help solo founders, business leaders, and small teams find a way of working with AI that makes sense for their business.",
    aboutTitle: "About onlinesourdough | My story and method",
    aboutDescription:
      "My approach to business architecture and agentic engineering, with AIOS as a starter and one-to-one pair engineering to develop what fits your business.",
    ogTitle: "Build better ways to work | onlinesourdough",
    ogDescription:
      "I help solo founders, business leaders, and small teams find a way of working with AI that makes sense for their business.",
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
      description: "I handle agreed architecture, software delivery, and ongoing care, with security checks and clear responsibility.",
      action: "Explore offer ↗",
      href: familyHref("arcitai"),
      current: false,
    },
    {
      label: "DIY + DONE WITH YOU",
      title: "onlinesourdough",
      description:
        "My free resources, AIOS as a starter, and one-to-one pair engineering to develop what fits your business.",
      action: "Current offer",
      href: "/",
      current: true,
    },
  ] satisfies StudioOffer[],
  page: {
    hero: {
      title: "Build better ways to work",
      description:
        "I help solo founders, business leaders, and small teams find a way of working with AI that makes sense for their business. AIOS is my starter: business context and working practices you make your own and keep improving, like a sourdough starter.",
    },
    menu: {
      ariaLabel: "onlinesourdough menu",
    },
    manifesto: {
      "title": "From one useful change towards more business freedom",
      "cta": "About the method",
      "paragraphs": [
        "I'm Gustav, a business and software architect. I bring business architecture and agentic engineering together to help you improve how your business works.",
        "AIOS is my starter, yours to build on. Like a sourdough starter, it gives you a foundation to care for: your business context, useful decisions, and working practices that you develop over time.",
        "I start with work worth improving. I help you apply agentic engineering practices: give agents useful context, set clear responsibilities, and review the results. Work one-to-one with me through pair engineering to plan, build, and review a useful change.",
        "Like sourdough, it needs care. You try things, check the quality, time and effort involved, and keep improving the setup. The goal is more control over your time and where you take the business."
      ]
    },
    about: {
      "eyebrow": "ABOUT / MY STORY & METHOD",
      "title": "About onlinesourdough",
      "tagline": "Business architecture and agentic engineering, put into practice.",
      "paragraphs": [
        "I help solo founders, business leaders, and small teams find a way of working with AI that makes sense for their business.",
        "I use AIOS as a starter and help you develop what fits your business. Explore the free resources yourself, work one-to-one with me through pair engineering, or ask me to take responsibility for agreed delivery through Arc’IT AI."
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
              "text": "A sourdough starter becomes useful through care and practice. I take the same approach to AIOS: start with a foundation, adapt it to your work, and look after it as you use it. Useful context, clear instructions, and review help you keep improving what comes out of it."
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
          "title": "AIOS: my starter, yours to build on",
          "blocks": [
            {
              "type": "paragraph",
              "text": "AIOS is a reusable starting point for how you work with AI: business context, instructions, and working practices that you can carry into your existing tools. Like a sourdough starter, you adapt it to your setting and look after it as you use it. You keep control of the setup."
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
              "text": "I share free guides and examples for business, software, and everyday work. AIOS and reusable skills are part of the collection, alongside other ideas and methods you can try for yourself. Choose what helps with the work in front of you."
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
              "text": "The Fermentary: one-to-one pair engineering"
            },
            {
              "type": "paragraph",
              "text": "I work one-to-one with you through pair engineering: planning, building, and reviewing together. I help you work through a business decision, develop a workflow, or build software. For software, that can include pair programming."
            },
            {
              "type": "paragraph",
              "text": "I use AIOS as a starter and help you adapt it to the work, tools, and responsibilities in your business. I agree with you on what a useful result looks like, then work alongside you on the setup, decisions, and difficult parts. The aim is to develop something that works for your business and that you understand how to use."
            },
            {
              "type": "paragraph",
              "text": "Factory resources can be useful when your work involves software development. I agree the guidance, implementation, and ongoing responsibility with you before taking on that work."
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
              "text": "I take agreed work off your plate through Arc’IT AI. I handle the architecture, software development, or review the project needs, with security checks built into delivery and clear scope and responsibility."
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
              "text": "I use AIOS as a starter for the context and working practices. I help you adapt it to your business and choose enough tools, instructions, and access for the first useful task. I make the permissions and approval points clear."
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
              "text": "Through Arc’IT AI, I help teams design, build, and maintain software around the way their business works. I handle agreed architecture, integrations, delivery, and security work, with clear responsibilities for access, acceptance, and ongoing care."
            },
            {
              "type": "paragraph",
              "text": "I’m developing **Factory — Software & Defence** through Arc’IT AI. It combines a method, a CLI, and a project Inbox for native agentic development. Its connected areas are:"
            },
            {
              "type": "list",
              "items": [
                "**Software:** scoped tasks, implementation, tests, independent review, and an approved handoff through your project’s existing development tools.",
                "**Defence:** security evaluation, assessment of findings, and agreed fixes within the project’s scope and access. Ongoing security work needs a separate agreement."
              ]
            },
            {
              "type": "paragraph",
              "text": "Factory is in active development. Its current native integration uses Codex on Linux with GitHub; other environments need a qualified integration. Relevant method resources can also be used through The Fermentary. Using a resource and asking me to operate it are separate decisions."
            },
            {
              "type": "paragraph",
              "text": "AIOS supports your broader daily way of working. Factory can be used independently, and buying an Arc’IT AI delivery does not require you to adopt AIOS."
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
              "text": "You work directly with me. In The Fermentary, that means one-to-one pair engineering: I help you plan, build, and review while you stay involved in the work and decisions. I agree scope, responsibilities, timing, and what useful progress looks like with you before starting."
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
                  "label": "Who you work with",
                  "value": "Me, Gustav Anderson, business and software architect"
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
              "text": "I’m behind all three. Through gustavonline, I share what I’m working on and learning. Through onlinesourdough, I offer free resources and practical DIY or done-with-you guidance. Through Arc’IT AI, I take responsibility for more involved, agreed delivery."
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
        "I share my guides and examples for business, software, and everyday work, including AIOS and reusable skills you can adapt.",
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
        "I work 1:1 with you on business decisions, workflows, and software. I use pair engineering and AIOS as a starter to develop what fits your business.",
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
        "I take agreed work off your plate through Arc’IT AI, with security checks built into delivery and clear scope and responsibility.",
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
