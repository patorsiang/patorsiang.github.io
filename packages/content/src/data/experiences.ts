import { legacyProfileSource } from "./shared";
import type { Experience } from "../types";

export const experiences = [
  {
    id: "experience.freelance-frontend-developer",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "work",
    title: {
      en: "Frontend Developer",
      translated: { th: { value: "Frontend Developer", status: "ai_draft" } },
    },
    organization: {
      en: "Freelance",
      translated: { th: { value: "Freelance", status: "ai_draft" } },
    },
    location: {
      en: "Bangkok, Thailand",
      translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "ai_draft" } },
    },
    startDate: "2023-06",
    endDate: "2024-05",
    summary: {
      en: "Designed, built, and deployed responsive websites and dashboards for client projects.",
      translated: {
        th: {
          value: "ออกแบบ พัฒนา และ deploy เว็บไซต์ responsive และ dashboard สำหรับโปรเจกต์ลูกค้า",
          status: "ai_draft",
        },
      },
    },
    highlights: [
      {
        en: "Collected client requirements and translated them into technical specifications and solutions.",
        translated: {
          th: {
            value:
              "เก็บ requirement จากลูกค้าและแปลงเป็น technical specification และแนวทางแก้ปัญหา",
            status: "ai_draft",
          },
        },
      },
      {
        en: "Built responsive websites using React, Next.js, and cloud hosting platforms.",
        translated: {
          th: {
            value: "พัฒนาเว็บไซต์ responsive ด้วย React, Next.js และ cloud hosting platforms",
            status: "ai_draft",
          },
        },
      },
      {
        en: "Maintained a corporate WordPress website and built a client analytics dashboard.",
        translated: {
          th: {
            value: "ดูแลเว็บไซต์ WordPress ขององค์กรและพัฒนา analytics dashboard สำหรับลูกค้า",
            status: "ai_draft",
          },
        },
      },
    ],
    skills: ["React", "Next.js", "WordPress", "Cloud Hosting"],
    tags: ["frontend", "web", "react", "nextjs", "dashboard", "cloud", "software-engineering"],
  },
  {
    id: "experience.datawow-frontend-developer",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "work",
    title: {
      en: "Frontend Developer",
      translated: { th: { value: "Frontend Developer", status: "ai_draft" } },
    },
    organization: {
      en: "Data Wow Co., Ltd.",
      translated: { th: { value: "Data Wow Co., Ltd.", status: "ai_draft" } },
    },
    location: {
      en: "Bangkok, Thailand",
      translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "ai_draft" } },
    },
    startDate: "2021-12",
    endDate: "2023-04",
    summary: {
      en: "Built privacy, dashboard, and internal-platform products with modern frontend frameworks.",
      translated: {
        th: {
          value:
            "พัฒนา product ด้าน privacy, dashboard และ internal platform ด้วย frontend frameworks สมัยใหม่",
          status: "ai_draft",
        },
      },
    },
    highlights: [
      {
        en: "Built PDPA compliance platforms including Cookie Wow and PDPA Pro.",
        translated: {
          th: {
            value: "พัฒนาแพลตฟอร์ม PDPA compliance รวมถึง Cookie Wow และ PDPA Pro",
            status: "ai_draft",
          },
        },
      },
      {
        en: "Designed dashboards, LINE bot chat storage systems, and mock exam platforms with real-time data handling.",
        translated: {
          th: {
            value:
              "ออกแบบ dashboard ระบบจัดเก็บแชต LINE bot และแพลตฟอร์ม mock exam ที่รองรับข้อมูลแบบ real-time",
            status: "ai_draft",
          },
        },
      },
      {
        en: "Worked in agile teams to deliver production-ready code under strict deadlines.",
        translated: {
          th: {
            value: "ทำงานในทีม agile เพื่อส่งมอบ production-ready code ภายใต้ deadline ที่เข้มงวด",
            status: "ai_draft",
          },
        },
      },
    ],
    skills: ["Next.js", "React", "Ruby", "AWS", "Agile"],
    tags: [
      "frontend",
      "web",
      "react",
      "nextjs",
      "dashboard",
      "cloud",
      "privacy-tech",
      "real-time",
      "software-engineering",
    ],
  },
  {
    id: "experience.bank-of-thailand-system-analyst",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "work",
    title: {
      en: "System Analyst",
      translated: { th: { value: "System Analyst", status: "ai_draft" } },
    },
    organization: {
      en: "Bank of Thailand",
      translated: { th: { value: "Bank of Thailand", status: "ai_draft" } },
    },
    location: {
      en: "Bangkok, Thailand",
      translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "ai_draft" } },
    },
    startDate: "2019-11",
    endDate: "2021-11",
    summary: {
      en: "Contributed to government financial systems involving blockchain, ISO 20022 migration, testing, and automation.",
      translated: {
        th: {
          value:
            "มีส่วนร่วมในระบบการเงินภาครัฐที่เกี่ยวข้องกับ blockchain, ISO 20022 migration, testing และ automation",
          status: "ai_draft",
        },
      },
    },
    highlights: [
      {
        en: "Contributed to DLTBond, a blockchain-based government bond platform.",
        translated: {
          th: {
            value: "มีส่วนร่วมใน DLTBond แพลตฟอร์มพันธบัตรรัฐบาลที่ใช้ blockchain",
            status: "ai_draft",
          },
        },
      },
      {
        en: "Supported ISO 20022 migration through Java updates, requirements analysis, and system testing.",
        translated: {
          th: {
            value:
              "สนับสนุน ISO 20022 migration ผ่านการปรับปรุง Java วิเคราะห์ requirement และทดสอบระบบ",
            status: "ai_draft",
          },
        },
      },
      {
        en: "Automated repetitive workflows using UiPath RPA.",
        translated: {
          th: {
            value: "ทำ automation สำหรับ workflow ที่ทำซ้ำด้วย UiPath RPA",
            status: "ai_draft",
          },
        },
      },
    ],
    skills: ["Angular", "Node.js", "Go", "Hyperledger Fabric", "Java", "UiPath"],
    tags: [
      "backend",
      "blockchain",
      "fintech",
      "nodejs",
      "go",
      "java",
      "automation",
      "software-engineering",
    ],
  },
  {
    id: "experience.kbtg-blockchain-developer-internship",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "internship",
    title: {
      en: "Blockchain Developer",
      translated: { th: { value: "Blockchain Developer", status: "ai_draft" } },
    },
    organization: {
      en: "KBTG Develop Bootcamp 2019",
      translated: { th: { value: "KBTG Develop Bootcamp 2019", status: "ai_draft" } },
    },
    location: {
      en: "Bangkok, Thailand",
      translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "ai_draft" } },
    },
    startDate: "2019-06",
    endDate: "2019-08",
    summary: {
      en: "Built a blockchain proof of concept during an Agile three-month sprint.",
      translated: {
        th: {
          value: "พัฒนา blockchain proof of concept ใน sprint แบบ Agile ระยะเวลา 3 เดือน",
          status: "ai_draft",
        },
      },
    },
    highlights: [
      {
        en: "Built Time Donation using React and a Go backend with Stellar SDK.",
        translated: {
          th: {
            value: "พัฒนา Time Donation ด้วย React และ Go backend โดยใช้ Stellar SDK",
            status: "ai_draft",
          },
        },
      },
      {
        en: "Developed a social-impact proof of concept in a bootcamp team environment.",
        translated: {
          th: {
            value: "พัฒนา proof of concept ด้าน social impact ในสภาพแวดล้อมทีม bootcamp",
            status: "ai_draft",
          },
        },
      },
    ],
    skills: ["React", "Go", "Stellar", "Blockchain", "Agile"],
    tags: ["frontend", "backend", "blockchain", "react", "go", "software-engineering"],
  },
  {
    id: "experience.beid-frontend-developer-internship",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "internship",
    title: {
      en: "Frontend Developer",
      translated: { th: { value: "Frontend Developer", status: "ai_draft" } },
    },
    organization: {
      en: "BeID Corporation Co., Ltd.",
      translated: { th: { value: "BeID Corporation Co., Ltd.", status: "ai_draft" } },
    },
    location: {
      en: "Bangkok, Thailand",
      translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "ai_draft" } },
    },
    startDate: "2018-06",
    endDate: "2018-07",
    summary: {
      en: "Developed dashboard and landing-page interfaces.",
      translated: {
        th: { value: "พัฒนา interface สำหรับ dashboard และ landing page", status: "ai_draft" },
      },
    },
    highlights: [
      {
        en: "Developed a dashboard and landing page using React.",
        translated: {
          th: { value: "พัฒนา dashboard และ landing page ด้วย React", status: "ai_draft" },
        },
      },
    ],
    skills: ["React"],
    tags: ["frontend", "web", "react", "dashboard", "software-engineering"],
  },
  {
    id: "education.university-of-kent-msc-advanced-computer-science",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "education",
    title: {
      en: "MSc Advanced Computer Science",
      translated: { th: { value: "MSc Advanced Computer Science", status: "ai_draft" } },
    },
    organization: {
      en: "University of Kent",
      translated: { th: { value: "University of Kent", status: "ai_draft" } },
    },
    location: {
      en: "Canterbury, UK",
      translated: { th: { value: "Canterbury, UK", status: "ai_draft" } },
    },
    startDate: "2024-09",
    endDate: "2025-09",
    summary: {
      en: "Completed an MSc in Advanced Computer Science with distinction.",
      translated: {
        th: {
          value: "สำเร็จการศึกษา MSc Advanced Computer Science ด้วยผลการเรียนระดับ distinction",
          status: "ai_draft",
        },
      },
    },
    highlights: [
      {
        en: "Studied artificial intelligence, deep learning, computer security, IoT, and quantum computing.",
        translated: {
          th: {
            value:
              "ศึกษา artificial intelligence, deep learning, computer security, IoT และ quantum computing",
            status: "ai_draft",
          },
        },
      },
      {
        en: "Built a cryptocurrency rug pull detection dissertation project.",
        translated: {
          th: {
            value: "พัฒนา dissertation project สำหรับตรวจจับ cryptocurrency rug pull",
            status: "ai_draft",
          },
        },
      },
    ],
    skills: ["AI", "Deep Learning", "Computer Security", "IoT", "Python"],
    tags: [
      "ai",
      "deep-learning",
      "computer-security",
      "iot",
      "python",
      "quantum-computing",
      "academic",
    ],
  },
  {
    id: "education.mahidol-ict-bsc",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "education",
    title: {
      en: "B.Sc. Information and Communication Technology",
      translated: {
        th: { value: "B.Sc. Information and Communication Technology", status: "ai_draft" },
      },
    },
    organization: {
      en: "Mahidol University",
      translated: { th: { value: "Mahidol University", status: "ai_draft" } },
    },
    location: {
      en: "Nakhon Pathom, Thailand",
      translated: { th: { value: "นครปฐม ประเทศไทย", status: "ai_draft" } },
    },
    startDate: "2015-07",
    endDate: "2019-06",
    summary: {
      en: "Studied Information and Communication Technology with a Database and Intelligent Systems focus.",
      translated: {
        th: {
          value:
            "ศึกษา Information and Communication Technology โดยเน้น Database และ Intelligent Systems",
          status: "ai_draft",
        },
      },
    },
    highlights: [
      {
        en: "Studied web programming, human-computer interaction, databases, algorithms, and digital image processing.",
        translated: {
          th: {
            value:
              "ศึกษา web programming, human-computer interaction, databases, algorithms และ digital image processing",
            status: "ai_draft",
          },
        },
      },
      {
        en: "Built a cultural heritage progressive web app as the senior project.",
        translated: {
          th: {
            value: "พัฒนา progressive web app ด้าน cultural heritage เป็น senior project",
            status: "ai_draft",
          },
        },
      },
    ],
    skills: ["Web Programming", "Databases", "Algorithms", "HCI", "PWA"],
    tags: ["web", "databases", "algorithms", "pwa", "academic"],
  },
  {
    id: "education.ramkhamhaeng-laws",
    locale: "en",
    source: legacyProfileSource,
    visibility: "public",
    type: "education",
    title: {
      en: "LL.B. Bachelor of Laws",
      translated: { th: { value: "LL.B. Bachelor of Laws", status: "ai_draft" } },
    },
    organization: {
      en: "Ramkhamhaeng University",
      translated: { th: { value: "Ramkhamhaeng University", status: "ai_draft" } },
    },
    location: {
      en: "Bangkok, Thailand",
      translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "ai_draft" } },
    },
    startDate: "2015",
    endDate: "2023",
    summary: {
      en: "Studied law with coursework related to intellectual property, international trade, and computer-related law.",
      translated: {
        th: {
          value:
            "ศึกษากฎหมาย โดยมี coursework ที่เกี่ยวข้องกับทรัพย์สินทางปัญญา การค้าระหว่างประเทศ และกฎหมายเกี่ยวกับคอมพิวเตอร์",
          status: "ai_draft",
        },
      },
    },
    highlights: [
      {
        en: "Built a cross-domain foundation connecting software, product risk, legal context, and people.",
        translated: {
          th: {
            value:
              "สร้างพื้นฐานข้ามสายงานที่เชื่อมโยงซอฟต์แวร์ ความเสี่ยงของ product บริบททางกฎหมาย และผู้ใช้งาน",
            status: "ai_draft",
          },
        },
      },
    ],
    skills: ["Law", "Intellectual Property", "Computer-Related Law"],
    tags: ["law", "intellectual-property", "computer-related-law", "academic"],
  },
] as const satisfies readonly Experience[];
