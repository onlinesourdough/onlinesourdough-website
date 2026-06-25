export type OfferIcon = "content" | "resources" | "proofing" | "bake";

export type Offer = {
  title: string;
  description: string;
  cta: string;
  status: string;
  icon: OfferIcon;
  href: string;
  external?: boolean;
  subscriberBadge?: {
    id: string;
  };
  details: string;
  bestFor: string;
  includes: string[];
};

export const siteData = {
  brand: "onlinesourdough",
  themeStorageKey: "onlinesourdough-theme",
  seo: {
    siteUrl: "https://onlinesourdough.com",
    themeColor: "#f8f2e8",
    title: "onlinesourdough | IT, software, and business architecture",
    description:
      "onlinesourdough helps shape the culture before AI becomes the only one that understands what keeps the bake alive.",
    ogTitle: "onlinesourdough | Same bake. Different deliveries.",
    ogDescription:
      "A practical menu for content, resources, direct access, and project work around software people can understand and AI can safely extend.",
  },
  page: {
    hero: {
      title: "Same bake. Different deliveries.",
      description:
        "AI writes code fast, but it does not create the culture around it: architecture, documentation, business understanding, monitoring, and technical ownership. onlinesourdough helps shape the culture before AI becomes the only one that understands what keeps the bake alive.",
    },
    menu: {
      label: "menu",
      ariaLabel: "onlinesourdough menu",
    },
    modal: {
      bestForLabel: "Best for",
      closeLabel: "Close details",
    },
    manifesto: {
      title: "The supermarket mix is fine. Until the business runs on the bake.",
      cta: {
        label: "Learn more",
        href: "/about",
      },
      paragraphs: [
        "Generated code is a useful ingredient. It can get something in the oven quickly, but speed does not create the culture around it.",
        "The risk is not fast AI-generated code. It starts when a demo becomes production, customers need to use it, and the business has to rely on it. That is when architecture, documentation, monitoring, logs, security, handover, and technical ownership matter.",
        "The bigger risk is that this happens before the culture is there to keep it alive and let AI safely extend it.",
        "That is the difference between a supermarket sourdough mix and a complete bake: not code alone, but architecture people can understand, decisions the business can stand behind, and a codebase AI can safely help extend.",
      ],
    },
    about: {
      title: "About onlinesourdough",
      description:
        "onlinesourdough is my way of explaining how I think software, business, and AI should work together. It started with sourdough, because the best systems are not only fast to make. They need structure, care, and people who understand what keeps them alive.",
      sections: [
        {
          title: "From demo to production",
          paragraphs: [
            "AI can help you build something useful very quickly. That is a good thing. The problem is not speed, and it is not AI-generated code by itself.",
            "The problem starts when a quick demo turns into production, customers need to use it, and the business has to rely on it. Then the work around the code matters: architecture, documentation, monitoring, security, handover, and someone taking technical ownership.",
          ],
        },
        {
          title: "Why sourdough",
          paragraphs: [
            "I love sourdough, but I cannot really bake it. My girlfriend can. I learn a lot from her every time we end up talking about what makes it work: ingredients, timing, structure, feel, and patience.",
            "That became the picture behind onlinesourdough. A supermarket mix can be useful, but it is not the same as understanding the bake. Software is similar. A tool can get you started, but the result still needs judgment, structure, and care.",
          ],
        },
        {
          title: "Where the brands meet",
          paragraphs: [
            "gustavonline is my personal brand. It is where I share content, ideas, and the way I think about IT, software, AI, and business.",
            "arcitai is my IT architecture consultancy. That is the business side: helping companies design, build, review, and maintain software that has to work in the real world.",
            "onlinesourdough sits between the two. It is the simple language I use to explain the method, the services, and where AI fits when software becomes part of a business.",
          ],
        },
        {
          title: "The point",
          paragraphs: [
            "AI does not replace you, your responsibility, or the need to understand what you are building. It can help you work faster, think better, and become more productive, but it still needs direction.",
            "The goal is to make complex technology simple enough to use responsibly. Not just code that runs, but software people can understand, decisions the business can stand behind, and a codebase AI can safely help extend.",
          ],
        },
      ],
    },
  },
  offers: [
    {
      title: "Content",
      description: "Sharing ingredients and recipes for connecting IT, software, and business.",
      cta: "Subscribe",
      status: "Open now",
      icon: "content",
      href: "https://www.youtube.com/@gustavonline",
      external: true,
      subscriberBadge: {
        id: "gustavonline-youtube",
      },
      details:
        "The public layer connected to Gustav Online. I share the thinking, small experiments and useful pieces from the work before they become a template, a course or a client project.",
      bestFor: "You want to watch first, borrow ideas and decide if my way of thinking is useful.",
      includes: [
        "Long-form videos and public examples",
        "Open-source templates when they are useful enough to share",
        "A low-pressure way to taste the method before buying anything",
      ],
    },
    {
      title: "Resources",
      description: "A practical library of frameworks and tools you can bake into your business today.",
      cta: "Access now",
      status: "Open now",
      icon: "resources",
      href: "https://resources.onlinesourdough.com",
      external: true,
      details:
        "Monthly access to the resources behind the work: courses, templates, ebooks and small technical playbooks. Built so you stop feeling blind when software, automation and architecture enter the room.",
      bestFor: "You have time to learn and want enough technical understanding to ask better questions.",
      includes: [
        "Courses, templates, ebooks and walkthroughs",
        "Reusable maps for turning ideas into first versions",
        "Plain-language explanations without tool hype",
      ],
    },
    {
      title: "Inner Circle",
      description: "Private 1:1 communication, direct calls, pair programming, and reviews while the bake takes shape.",
      cta: "Limited availability",
      status: "Limited availability",
      icon: "proofing",
      href: "mailto:hello@arcitai.com?subject=onlinesourdough%20-%20Inner%20Circle",
      details:
        "A fixed 3, 6 or 12 month commitment paid upfront. This is the close lane: your work, your questions, your pace, with me close enough to review the messy parts before they become expensive.",
      bestFor: "You can do parts yourself, but want someone technical close enough to catch the expensive mistakes early.",
      includes: [
        "Private Slack channel with direct text communication",
        "Slack huddles when that is the right format",
        "Pair programming, architecture reviews and decision support",
      ],
    },
    {
      title: "Complete Bake",
      description: "Done-for-you agency service when the goal is clear and time is better spent growing your business.",
      cta: "Start a project",
      status: "By request",
      icon: "bake",
      href: "https://arcitai.com",
      external: true,
      details:
        "The project format. We estimate the work, build the first working version and make handover, documentation and simple maintenance part of the development from day one.",
      bestFor: "You know roughly what should exist, but you do not have the time to become technical before it needs to work.",
      includes: [
        "Project estimate before the build starts",
        "Internal tools, automations, prototypes or integrations",
        "Documentation, handover and support path",
      ],
    },
  ] satisfies Offer[],
  footer: {
    copyright: "© 2026 onlinesourdough",
    links: [
      {
        label: "gustavonline",
        href: "https://gustavonline.com",
      },
      {
        label: "arcitai",
        href: "https://arcitai.com",
      },
    ],
  },
};
