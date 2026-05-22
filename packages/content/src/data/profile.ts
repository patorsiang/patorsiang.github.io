import { legacyProfileSource } from "./shared";
import type { Profile } from "../types";

export const profile = {
  id: "profile.napatchol-thaipanich",
  locale: "en",
  source: legacyProfileSource,
  visibility: "public",
  name: "Napatchol Thaipanich",
  handle: "patorsiang",
  nickname: "Pat",
  nickname2: "Siang",
  role: "AI full-stack developer",
  location: "Bangkok, Thailand",
  headline:
    "AI full-stack developer building practical, human-centred software across web, AI, security, and interactive systems.",
  summary: [
    "Software developer with a mainly frontend background and experience working on real-world systems in government and startup environments.",
    "Experienced with React, Next.js, Angular, backend exposure, blockchain systems, and machine-learning projects.",
    "Interested in fintech, govtech, cybersecurity, AI, and product-driven domains where software and trust meet.",
  ],
  contact: {
    email: {
      label: "napatchol.tha@gmail.com",
      url: "mailto:napatchol.tha@gmail.com",
    },
    github: {
      label: "github.com/patorsiang",
      url: "https://github.com/patorsiang",
    },
    linkedin: {
      label: "linkedin.com/in/napatchol-thaipanich",
      url: "https://www.linkedin.com/in/napatchol-thaipanich",
    },
  },
  links: [
    {
      label: "GitHub",
      url: "https://github.com/patorsiang",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/napatchol-thaipanich",
    },
  ],
} as const satisfies Profile;
