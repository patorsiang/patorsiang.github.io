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
    translated: { th: { value: "Full-stack developer", status: "reviewed" } },
  },
  location: {
    en: "Bangkok, Thailand",
    translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "reviewed" } },
  },
  headline: {
    en: "Full-stack developer building practical web, cybersecurity, gamified learning, and AI-related product features.",
    translated: {
      th: {
        value:
          "Full-stack developer ที่พัฒนาฟีเจอร์ผลิตภัณฑ์เชิงปฏิบัติด้านเว็บ cybersecurity, gamified learning และ AI",
        status: "reviewed",
      },
    },
  },
  summary: [
    {
      en: "Full-stack developer at SEC Playground Co., Ltd., recently passed probation and building product features across cybersecurity, gamified learning, and AI-related platform work.",
      translated: {
        th: {
          value:
            "Full-stack developer ที่ SEC Playground Co., Ltd. เพิ่งผ่านโปร และกำลังพัฒนาฟีเจอร์ผลิตภัณฑ์ด้าน cybersecurity, gamified learning และแพลตฟอร์มที่เกี่ยวข้องกับ AI",
          status: "reviewed",
        },
      },
    },
    {
      en: "I work across Vue.js, Nuxt.js, Node.js, APIs, SQL, React, Next.js, Angular, backend services, blockchain systems, and applied AI projects, with a focus on practical implementation.",
      translated: {
        th: {
          value:
            "ทำงานกับ Vue.js, Nuxt.js, Node.js, APIs, SQL, React, Next.js, Angular, backend services, ระบบ blockchain และโปรเจกต์ AI เชิงประยุกต์ โดยเน้นการนำไปใช้งานจริง",
          status: "reviewed",
        },
      },
    },
    {
      en: "I care about software that is reliable, understandable, and trusted by the people who depend on it, especially in security-aware and learning-focused products.",
      translated: {
        th: {
          value:
            "ให้ความสำคัญกับซอฟต์แวร์ที่น่าเชื่อถือ เข้าใจง่าย และได้รับความไว้วางใจจากผู้ใช้ โดยเฉพาะผลิตภัณฑ์ที่คำนึงถึงความปลอดภัยและการเรียนรู้",
          status: "reviewed",
        },
      },
    },
  ],
  contact: {
    email: {
      label: {
        en: "napatchol.tha@gmail.com",
        translated: { th: { value: "napatchol.tha@gmail.com", status: "approved" } },
      },
      url: "mailto:napatchol.tha@gmail.com",
    },
    github: {
      label: {
        en: "github.com/patorsiang",
        translated: { th: { value: "github.com/patorsiang", status: "approved" } },
      },
      url: "https://github.com/patorsiang",
    },
    linkedin: {
      label: {
        en: "linkedin.com/in/napatchol-thaipanich",
        translated: { th: { value: "linkedin.com/in/napatchol-thaipanich", status: "approved" } },
      },
      url: "https://www.linkedin.com/in/napatchol-thaipanich",
    },
  },
  links: [
    {
      label: { en: "Portfolio", translated: { th: { value: "Portfolio", status: "approved" } } },
      url: "https://patorsiang.github.io/",
    },
    {
      label: { en: "GitHub", translated: { th: { value: "GitHub", status: "approved" } } },
      url: "https://github.com/patorsiang",
    },
    {
      label: { en: "LinkedIn", translated: { th: { value: "LinkedIn", status: "approved" } } },
      url: "https://www.linkedin.com/in/napatchol-thaipanich",
    },
  ],
} as const satisfies Profile;
