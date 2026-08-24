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
    title: "Build the business you want to run. | onlinesourdough",
    description:
      "onlinesourdough helps you turn real business problems into better processes, useful AI, automation, or software you can understand and own.",
    aboutTitle: "The onlinesourdough Method | onlinesourdough",
    aboutDescription:
      "The onlinesourdough Method helps you turn real business problems into better processes, useful AI, automation, or software you can understand and own.",
    ogTitle: "Build the business you want to run. | onlinesourdough",
    ogDescription:
      "onlinesourdough helps you turn real business problems into better processes, useful AI, automation, or software you can understand and own.",
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
        "Use the onlinesourdough Method through Resources, or work through the current problem with direct guidance.",
      action: "Current offer",
      href: "/",
      current: true,
    },
  ] satisfies StudioOffer[],
  page: {
    hero: {
      title: "Build the business you want to run.",
      description:
        "onlinesourdough helps you turn real business problems into better processes, useful AI, automation, or software you can understand and own. Use the resources, work through it with me, or have the solution delivered.",
    },
    menu: {
      label: "SAME BAKE / DIFFERENT DELIVERIES",
      ariaLabel: "onlinesourdough menu",
    },
    manifesto: {
      title: "From business problem to working solution.",
      cta: "About the method",
      paragraphs: [
        "Every business has work that takes too much time, costs too much, leads to mistakes, or makes the next step harder than it should be.",
        "onlinesourdough helps you make that problem clear, choose the smallest useful change, and turn it into something that works.",
        "Sometimes the answer is a simpler process. Sometimes it is automation, an AI agent, a connection between existing tools, or software. The right solution depends on the business.",
        "When something needs to be built, it should be understandable, maintainable, and owned by the business.",
        "AIOS gives the work a home on your computer. It brings together your business context and the way you work with AI, agents, automation, software, and documentation, so you and your tools do not start from scratch every time.",
        "The goal is more control over time, costs, capacity, and direction.",
      ],
    },
    about: {
      eyebrow: "ABOUT / THE ONLINESOURDOUGH METHOD",
      title: "The onlinesourdough Method",
      paragraphs: [
        "onlinesourdough is the shared method for turning real business problems into better processes, useful AI, automation, or software you can understand and own. The work starts with the business: its current constraint, the people and processes involved, and the outcome that needs to change.",
        "AIOS gives the work a home on your computer. It brings together your business context and the way you work with AI, agents, automation, software, and documentation, so you and your tools do not start from scratch every time.",
        "Business Freedom is the outcome: more control over time, costs, capacity, and direction. The method can be used through Resources, The Fermentary, or Complete Bake depending on how much support the work needs.",
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
          title: "Use AI where it helps",
          paragraphs: [
            "AI becomes more useful when it has business context, a bounded responsibility, clear guardrails, and a way to show whether the work is complete. It can support a person, run a watched workflow, or handle a recurring outcome as the evidence allows.",
            "The right answer may be a process, automation, agent, integration, or software. Whatever is built should be understandable, maintainable, and owned by the business.",
          ],
        },
        {
          title: "Build for freedom and ownership",
          paragraphs: [
            "When software is the right intervention, it is only part of the work. The result needs to be documented, maintainable, recoverable, and handed over in a way the business can own.",
            "Business Freedom does not mean maximum automation. It means gaining more control without creating another system that pulls the founder back into daily operation. The same method is available through Resources (DIY), The Fermentary (DWY), or Complete Bake (DFY), with relevant Resources included in the higher-touch paths when useful.",
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
        "A guided modular system inside a calm resource library for finding the problem and building the solution yourself.",
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
        "Find and solve the business problem with Gustav close to the decisions and the work. Relevant Resources may be part of the work when useful.",
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
        "Gustav takes responsibility for the agreed solution and handover. Relevant Resources may be part of the work when useful.",
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
