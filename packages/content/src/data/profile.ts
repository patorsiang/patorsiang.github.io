import { legacyProfileSource } from "./shared";
import type { Profile } from "../types";

export const profile = {
  id: "profile.napatchol-thaipanich",
  locale: "en",
  source: legacyProfileSource,
  visibility: "public",
  name: {
    en: "Napatchol Thaipanich",
    translated: { th: { value: "ณภัทรชล ไทพาณิชย์", status: "reviewed" } },
  },
  handle: "patorsiang",
  nickname: { en: "Pat", translated: { th: { value: "ภัทร", status: "reviewed" } } },
  nickname2: { en: "Siang", translated: { th: { value: "เซียง", status: "reviewed" } } },
  role: {
    en: "Full-stack developer",
    translated: { th: { value: "AI full-stack developer", status: "reviewed" } },
  },
  location: {
    en: "Bangkok, Thailand",
    translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "reviewed" } },
  },
  headline: {
    en: "Full-stack developer building practical software across web, AI, security, and trust-sensitive systems.",
    translated: {
      th: {
        value:
          "AI full-stack developer ที่สร้างซอฟต์แวร์ใช้งานได้จริงและคำนึงถึงผู้ใช้ ครอบคลุม web, AI, security และระบบ interactive",
        status: "ai_draft",
      },
    },
  },
  summary: [
    {
      en: "Full-stack developer with a frontend foundation and experience building production software in government, startup, and client-facing environments.",
      translated: {
        th: {
          value:
            "Software developer ที่มีพื้นฐานหลักด้าน frontend และมีประสบการณ์ทำงานกับระบบใช้งานจริงในหน่วยงานภาครัฐและสภาพแวดล้อมแบบ startup",
          status: "ai_draft",
        },
      },
    },
    {
      en: "I work across React, Next.js, Angular, backend services, blockchain systems, and applied AI projects, with a focus on practical implementation over novelty for its own sake.",
      translated: {
        th: {
          value:
            "มีประสบการณ์กับ React, Next.js, Angular งาน backend บางส่วน ระบบ blockchain และโปรเจกต์ machine learning",
          status: "ai_draft",
        },
      },
    },
    {
      en: "I am interested in fintech, govtech, cybersecurity, AI, and product domains where software has to be reliable, understandable, and trusted by the people who depend on it.",
      translated: {
        th: {
          value:
            "สนใจ fintech, govtech, cybersecurity, AI และงาน product-driven ที่ซอฟต์แวร์ต้องทำงานร่วมกับความน่าเชื่อถือ",
          status: "ai_draft",
        },
      },
    },
  ],
  contact: {
    email: {
      label: {
        en: "napatchol.tha@gmail.com",
        translated: { th: { value: "napatchol.tha@gmail.com", status: "ai_draft" } },
      },
      url: "mailto:napatchol.tha@gmail.com",
    },
    github: {
      label: {
        en: "github.com/patorsiang",
        translated: { th: { value: "github.com/patorsiang", status: "ai_draft" } },
      },
      url: "https://github.com/patorsiang",
    },
    linkedin: {
      label: {
        en: "linkedin.com/in/napatchol-thaipanich",
        translated: { th: { value: "linkedin.com/in/napatchol-thaipanich", status: "ai_draft" } },
      },
      url: "https://www.linkedin.com/in/napatchol-thaipanich",
    },
  },
  links: [
    {
      label: { en: "GitHub", translated: { th: { value: "GitHub", status: "ai_draft" } } },
      url: "https://github.com/patorsiang",
    },
    {
      label: { en: "LinkedIn", translated: { th: { value: "LinkedIn", status: "ai_draft" } } },
      url: "https://www.linkedin.com/in/napatchol-thaipanich",
    },
  ],
} as const satisfies Profile;
