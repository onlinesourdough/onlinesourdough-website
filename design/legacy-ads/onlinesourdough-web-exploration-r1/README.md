# onlinesourdough website exploration

The [comparison guide](index.html) starts with the three refined r5 designs and retains the ten earlier screenshots below. [DESIGN.md](DESIGN.md) is canonical.

- [Main — Logo + Metode](http://127.0.0.1:53671/?variant=combined): living logo above the hero, original cards, merged method and animated tube, personal footer.
- [Resources — Metode](http://127.0.0.1:53672/?variant=flow): refined spacing, interactive capability curve, and readable stages on desktop and mobile.
- [Resources — video first](http://127.0.0.1:53672/?variant=vsl): existing video above the folders and method, with the hero copy and CTA row removed.
- [All thirteen screenshots](screenshots-r5.zip).

Start both local frontends from this directory with `node prototype/serve.mjs`. Start the guide with `python3 -m http.server 53567 --bind 127.0.0.1`. Original views remain at `?variant=baseline`; the character study is at `http://127.0.0.1:53671/?variant=hero-lab`.

[OpenPencil r5](openpencil/onlinesourdough-design-map-r5-final.op) contains the three new pages above the ten earlier comparisons. Its live workbench is recorded in `state/workbench.json`. Page images are actual browser captures inside editable frames and notes; text and animation are edited in [the retained source](prototype/source/README.md).

The two website repositories are read-only inputs. Local previews do not include account/backend services. The video is the existing six-second motion preview; no new VSL was produced. Sound starts off and can be enabled beside the living logo.

The r4 source and evidence remain intact. Technical verification of r5 is recorded in [REVIEW.md](REVIEW.md). Owner direction selection and production implementation are separate from this completed local design revision.
