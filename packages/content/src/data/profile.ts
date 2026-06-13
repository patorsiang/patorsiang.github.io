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
    en: "Full-stack developer working on practical software across web, AI, security, and data-informed systems.",
    translated: {
      th: {
        value:
          "Full-stack developer ที่ทำงานกับซอฟต์แวร์เชิงปฏิบัติ ครอบคลุมเว็บ AI ความปลอดภัย และระบบที่ใช้ข้อมูลประกอบการทำงาน",
        status: "reviewed",
      },
    },
  },
  summary: [
    {
      en: "Full-stack developer with a frontend foundation and experience contributing to software in government, startup, and client-facing environments.",
      translated: {
        th: {
          value:
            "Full-stack developer ที่มีพื้นฐานด้าน frontend และมีประสบการณ์ร่วมพัฒนาซอฟต์แวร์ในหน่วยงานภาครัฐ สตาร์ทอัพ",
          status: "reviewed",
        },
      },
    },
    {
      en: "I work across React, Next.js, Angular, backend services, blockchain systems, and applied AI projects, with a focus on practical implementation over novelty for its own sake.",
      translated: {
        th: {
          value:
            "ทำงานกับ React, Next.js, Angular, backend services, ระบบ blockchain และโปรเจกต์ AI เชิงประยุกต์ โดยให้ความสำคัญกับการใช้งานจริงมากกว่าความแปลกใหม่เพียงอย่างเดียว",
          status: "reviewed",
        },
      },
    },
    {
      en: "I am interested in game, cybersecurity, and AI domains where software has to be reliable, understandable, and trusted by the people who depend on it.",
      translated: {
        th: {
          value:
            "สนใจ game, cybersecurity, AI และงานผลิตภัณฑ์ที่ซอฟต์แวร์ต้องมีความน่าเชื่อถือ เข้าใจง่าย และได้รับความไว้วางใจจากผู้ใช้",
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
