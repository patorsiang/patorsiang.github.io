import { legacyProfileSource } from "./shared";
import type { Profile } from "../types";

export const profile = {
  id: "profile.napatchol-thaipanich",
  locale: "en",
  source: legacyProfileSource,
  visibility: "public",
  name: { en: "Napatchol Thaipanich" },
  handle: "patorsiang",
  nickname: { en: "Pat" },
  nickname2: { en: "Siang" },
  role: { en: "AI full-stack developer" },
  location: { en: "Bangkok, Thailand" },
  headline: {
    en: "AI full-stack developer building practical, human-centred software across web, AI, security, and interactive systems.",
  },
  summary: [
    {
      en: "Software developer with a mainly frontend background and experience working on real-world systems in government and startup environments.",
    },
    {
      en: "Experienced with React, Next.js, Angular, backend exposure, blockchain systems, and machine-learning projects.",
    },
    {
      en: "Interested in fintech, govtech, cybersecurity, AI, and product-driven domains where software and trust meet.",
    },
  ],
  contact: {
    email: {
      label: { en: "napatchol.tha@gmail.com" },
      url: "mailto:napatchol.tha@gmail.com",
    },
    github: {
      label: { en: "github.com/patorsiang" },
      url: "https://github.com/patorsiang",
    },
    linkedin: {
      label: { en: "linkedin.com/in/napatchol-thaipanich" },
      url: "https://www.linkedin.com/in/napatchol-thaipanich",
    },
  },
  links: [
    {
      label: { en: "GitHub" },
      url: "https://github.com/patorsiang",
    },
    {
      label: { en: "LinkedIn" },
      url: "https://www.linkedin.com/in/napatchol-thaipanich",
    },
  ],
} as const satisfies Profile;
