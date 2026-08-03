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

export const siteData = {
  brand: "onlinesourdough",
  themeStorageKey: "onlinesourdough-theme",
  assets: {
    logo: "/assets/onlinesourdough-mark-large-pixel-v3.svg",
  },
  seo: {
    siteUrl: "https://onlinesourdough.com",
    themeColor: "#f8f2e8",
    title: "onlinesourdough: Same bake. Different deliveries.",
    description:
      "Business development and software meet to create positive bandwidth: more time to work on the business, not inside it.",
    aboutDescription: "Why onlinesourdough connects business development, software, and AI.",
    ogTitle: "onlinesourdough: Same bake. Different deliveries.",
    ogDescription:
      "Content, resources, direct guidance, and complete delivery for business development, software, and responsible AI-first work.",
  },
  navigation: {
    offers: "Offers",
    menu: "Menu",
    about: "About",
  },
  studioOffers: [
    {
      label: "DONE FOR YOU",
      title: "Arc'IT AI",
      description: "Business understanding carried into working software.",
      action: "Explore offer ↗",
      href: "https://arcitai.com",
      current: false,
    },
    {
      label: "DIY + DONE WITH YOU",
      title: "onlinesourdough",
      description: "Learn the method, use the resources, or build with direct guidance.",
      action: "Current offer",
      href: "/",
      current: true,
    },
  ] satisfies StudioOffer[],
  page: {
    hero: {
      title: "Same bake. Different deliveries.",
      description:
        "Today, almost anyone can start building software with AI. That opens new possibilities, but it also makes it easy to create complexity, technical debt, and systems nobody knows how to own. Here, business development and software meet to decide what should exist and how it should work. The goal is positive bandwidth: more time to work on the business, not inside it.",
    },
    menu: {
      label: "Menu",
      ariaLabel: "onlinesourdough menu",
    },
    manifesto: {
      title: "The supermarket mix is fine. Until the business runs on the bake.",
      cta: "About the method",
      paragraphs: [
        "A “supermarket mix” is a template, ready-made tool, or vibe-coded first version. It gets something in the oven quickly, but it does not create the architecture, documentation, monitoring, or ownership the business needs.",
        "AI-first means starting with the business and its constraint, then using software and AI to remove work that should not depend on you. Positive bandwidth is the result: the system keeps moving without pulling you back into daily operation. Otherwise the shortcut becomes technical debt and another operation to run.",
      ],
    },
    about: {
      eyebrow: "ABOUT / THE METHOD",
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
      backLabel: "Back to menu",
    },
  },
  offers: [
    {
      number: "01",
      title: "Content",
      description: "Ideas and recipes for connecting business and software.",
      cta: "Explore content",
      status: "Open now",
      href: "https://www.youtube.com/@gustavonline",
      image: {
        src: "/assets/content-lofi-v3-transparent.png",
        alt: "Pixel-art publishing desk with a sourdough starter jar",
      },
    },
    {
      number: "02",
      title: "Resources",
      description: "Practical guides, patterns, and tools to use in your own business.",
      cta: "Open library",
      status: "Open now",
      href: "https://resources.onlinesourdough.com",
      image: {
        src: "/assets/resources-lofi-v3-transparent.png",
        alt: "Pixel-art archive folder with bread lame and dough scraper",
      },
    },
    {
      number: "03",
      title: "Inner Circle",
      description: "Direct access, pair programming, and reviews while we build together.",
      cta: "Work together",
      status: "Limited availability",
      href: "mailto:hello@arcitai.com?subject=onlinesourdough%20-%20Inner%20Circle",
      image: {
        src: "/assets/inner-circle-lofi-v3-transparent.png",
        alt: "Pixel-art shared worktable with coffee and a slice of sourdough",
      },
    },
    {
      number: "04",
      title: "Complete Bake",
      description:
        "The system built, documented, and handed over, so you can work on the business instead of inside it.",
      cta: "Start a project",
      status: "By request",
      href: "https://arcitai.com",
      image: {
        src: "/assets/complete-bake-lofi-v3-transparent.png",
        alt: "Pixel-art computer, server, and oven with bread",
      },
    },
  ] satisfies Offer[],
  footer: {
    copyright: "© 2026 onlinesourdough",
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
