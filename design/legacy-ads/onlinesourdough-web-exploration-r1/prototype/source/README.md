# Retained frontend source

These files overlay the two source snapshots listed in DESIGN.md. The local bundles under `prototype/main` and `prototype/resources` run directly through `prototype/serve.mjs`.

| Retained file         | Source snapshot | Destination                                     |
| --------------------- | --------------- | ----------------------------------------------- |
| App.tsx               | resources       | src/App.tsx                                     |
| HomePage.tsx          | resources       | src/pages/HomePage.tsx                          |
| LandingPage.tsx       | main            | src/features/landing/components/LandingPage.tsx |
| SiteHeader.tsx        | main            | src/components/layout/SiteHeader.tsx            |
| SiteFooter.tsx        | main            | src/components/layout/SiteFooter.tsx            |
| DesignAddition.tsx    | main            | src/DesignAddition.tsx                          |
| FounderSignature.tsx  | main            | src/FounderSignature.tsx                        |
| HeroField.tsx         | main            | src/HeroField.tsx                               |
| ParticleFlow.tsx      | main            | src/ParticleFlow.tsx                            |
| ResourcesGrowth.tsx   | main            | src/ResourcesGrowth.tsx                         |
| design-addition.css   | main            | src/design-addition.css                         |
| design-refinement.css | main            | src/design-refinement.css                       |

The shared illustration components and their styles are also present in the Resources snapshot. `runs/run-0005/source-map.json` records the retained file mapping. `viewport-proof.html` is a local screenshot harness; it is not part of the product flow.
