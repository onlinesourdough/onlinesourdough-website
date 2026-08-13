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
    title: "Give AI a real job in your business. | onlinesourdough",
    description:
      "A practical method for finding where time, capacity, or decisions are getting stuck, then giving AI a bounded job the business can understand and own.",
    aboutTitle: "A practical method for modern business. | onlinesourdough",
    aboutDescription:
      "onlinesourdough is my way of explaining how business, software, and AI should work together.",
    ogTitle: "Give AI a real job in your business. | onlinesourdough",
    ogDescription:
      "onlinesourdough is a practical method for finding the current constraint and giving AI a bounded job with clear ownership.",
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
      description: "A defined business capability, designed, built, and handed over.",
      action: "Explore offer ↗",
      href: "https://arcitai.com",
      current: false,
    },
    {
      label: "DIY + DONE WITH YOU",
      title: "onlinesourdough",
      description:
        "Learn the method, use the resources, or work through your current constraint with direct guidance.",
      action: "Current offer",
      href: "/",
      current: true,
    },
  ] satisfies StudioOffer[],
  page: {
    hero: {
      title: "Give AI a real job in your business.",
      description:
        "The method starts with the business: find where time, capacity, or decisions are getting stuck, then give AI a bounded job with the context, guardrails, and ownership to make it useful.",
    },
    menu: {
      label: "SAME BAKE / DIFFERENT DELIVERIES",
      ariaLabel: "onlinesourdough menu",
    },
    manifesto: {
      title: "The business is the recipe. AI is the starter.",
      cta: "About the method",
      paragraphs: [
        "A sourdough starter is useful, adaptable, and slightly needy.",
        "It is not the finished loaf. It becomes valuable when it is fed well, understood, and used in the right recipe.",
        "AI works in much the same way.",
        "Give it real business context, a bounded job, clear guardrails, and honest feedback, and it can support people, keep workflows moving, and handle recurring work that should not depend on the founder.",
        "The working setup becomes more useful as its context, routines, tools, and feedback improve. Software gives that capability a reliable place to work.",
        "Without structure and ownership, AI may still produce something impressive. A bubbling demo is not the same as a capability the business can rely on.",
        "When technology is part of the answer, it should be documented, monitored, recoverable, and clearly owned.",
        "The result should create more business bandwidth than it consumes.",
      ],
    },
    about: {
      eyebrow: "ABOUT / THE METHOD",
      title: "A practical method for modern business.",
      paragraphs: [
        "onlinesourdough is my way of explaining how business, software, and AI should work together. The method starts with the business: its current constraint, the people and processes involved, and the outcome that needs to change. Only then do we decide whether software, automation, or AI belongs in the solution.",
        "The name comes from sourdough. A starter can become part of many different recipes. It can also become more useful over time, but only when it receives the right inputs and someone understands how to care for it. That is how I think about AI inside a business.",
        "The working capability can improve as its business context, routines, tools, and feedback improve. That does not happen by itself. It still needs direction, boundaries, and clear ownership. The goal is Business Freedom: more control over time, capacity, and direction.",
      ],
      sections: [
        {
          title: "Find the current constraint",
          paragraphs: [
            "Every founder-led business has work that depends too much on the founder or a few key people. The constraint may sit in the offer, the way the business operates, or the way demand is created and converted.",
            "We start by understanding that work, its owner, and the outcome that needs to change. Only then do we decide whether anything should be built.",
          ],
        },
        {
          title: "Make the smallest useful change",
          paragraphs: [
            "Once the constraint is clear, we look at what can be eliminated, automated, or delegated. The answer might be a decision, a simpler process, a workflow, an integration, software, or an AI agent.",
            "The aim is to close one useful feedback loop and measure the result before adding more. Fast progress matters, but only when the business can keep understanding and owning what changes.",
          ],
        },
        {
          title: "Give AI a real job",
          paragraphs: [
            "AI becomes more useful when it has business context, a bounded responsibility, clear guardrails, and a way to show whether the work is complete. It can support a person, run a watched workflow, or handle a recurring outcome as the evidence allows.",
            "This is where context engineering, agent workflows, and good software architecture meet. The technical work matters because the business has to trust the result, recover when something fails, and know who owns what.",
          ],
        },
        {
          title: "Build for freedom and ownership",
          paragraphs: [
            "When software is the right intervention, code that runs is only the beginning. The capability also needs the right architecture, documentation, security, monitoring, recovery, and handover for its real level of risk.",
            "Business Freedom does not mean maximum automation. It means gaining more control without creating another system that pulls the founder back into daily operation. That is the same method whether you apply it yourself through Resources, work through it together in the Inner Circle, or have a Complete Bake delivered by Arc'IT AI.",
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
      description: "Ideas, experiments, and real examples for connecting business, software, and AI.",
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
      description:
        "Practical blueprints, patterns, and reusable ingredients for applying the method to your own business.",
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
      description:
        "Direct guidance, decisions, and reviews while we work through your current constraint together.",
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
        "A defined business capability designed, built, documented, and handed over around an outcome your business can own.",
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
