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
      translated: { th: { value: "Frontend Developer", status: "approved" } },
    },
    organization: {
      en: "Freelance",
      translated: { th: { value: "Freelance", status: "approved" } },
    },
    location: {
      en: "Bangkok, Thailand",
      translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "approved" } },
    },
    startDate: "2023-06",
    endDate: "2024-05",
    summary: {
      en: "Hired for freelance work: maintained a corporate WordPress site and built responsive websites and dashboard interfaces for clients, from requirements gathering to deployment support.",
      translated: {
        th: {
          value:
            "รับงานฟรีแลนซ์: ดูแลเว็บไซต์ WordPress ขององค์กร และสร้างเว็บไซต์แบบ responsive พร้อมอินเทอร์เฟซแดชบอร์ดสำหรับลูกค้า ตั้งแต่เก็บความต้องการจนถึงสนับสนุนการนำขึ้นใช้งาน",
          status: "reviewed",
        },
      },
    },
    highlights: [
      {
        en: "Worked with multiple frameworks including React, Next.js, and WordPress to meet diverse project requirements.",
        translated: {
          th: {
            value:
              "ทำงานกับ frameworks หลากหลาย รวมถึง React, Next.js และ WordPress เพื่อตอบสนองความต้องการของโปรเจกต์",
            status: "reviewed",
          },
        },
      },
      {
        en: "Built responsive web experiences following design specifications from requirements to production deployment.",
        translated: {
          th: {
            value: "สร้างเว็บ responsive ตามแบบออกแบบตั้งแต่เก็บความต้องการจนถึงนำขึ้นใช้งาน",
            status: "reviewed",
          },
        },
      },
      {
        en: "Communicated effectively with clients and team members to ensure clear understanding and successful project delivery.",
        translated: {
          th: {
            value:
              "สื่อสารอย่างมีประสิทธิภาพกับลูกค้าและสมาชิกในทีมเพื่อให้มั่นใจในการส่งมอบโปรเจกต์ที่สำเร็จ",
            status: "reviewed",
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
      translated: { th: { value: "Frontend Developer", status: "approved" } },
    },
    organization: {
      en: "Data Wow Co., Ltd.",
      translated: { th: { value: "Data Wow Co., Ltd.", status: "approved" } },
    },
    location: {
      en: "Bangkok, Thailand",
      translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "approved" } },
    },
    startDate: "2021-12",
    endDate: "2023-04",
    summary: {
      en: "Developed frontend features for privacy-tech, dashboard, and internal-platform products in a fast-moving product team.",
      translated: {
        th: {
          value:
            "พัฒนา frontend features สำหรับผลิตภัณฑ์ด้าน privacy-tech, dashboard และ internal platform ในทีมผลิตภัณฑ์ที่ทำงานรวดเร็ว",
          status: "reviewed",
        },
      },
    },
    highlights: [
      {
        en: "Built interfaces for PDPA compliance platforms including Cookie Wow and PDPA Pro, helping users manage privacy controls and consent workflows.",
        translated: {
          th: {
            value:
              "พัฒนา interfaces สำหรับแพลตฟอร์ม PDPA compliance รวมถึง Cookie Wow และ PDPA Pro",
            status: "reviewed",
          },
        },
      },
      {
        en: "Implemented dashboards, LINE bot chat storage systems, and mock exam platforms with real-time data handling needs.",
        translated: {
          th: {
            value:
              "พัฒนา dashboard ระบบจัดเก็บแชต LINE bot และแพลตฟอร์ม mock exam ที่เกี่ยวข้องกับข้อมูลแบบ real-time",
            status: "reviewed",
          },
        },
      },
      {
        en: "Worked with agile product teams to deliver frontend changes within planned release timelines.",
        translated: {
          th: {
            value: "ทำงานร่วมกับทีม agile เพื่อส่งมอบงาน frontend ตามรอบ release ที่วางไว้",
            status: "reviewed",
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
      translated: { th: { value: "System Analyst", status: "approved" } },
    },
    organization: {
      en: "Bank of Thailand",
      translated: { th: { value: "Bank of Thailand", status: "approved" } },
    },
    location: {
      en: "Bangkok, Thailand",
      translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "approved" } },
    },
    startDate: "2019-11",
    endDate: "2021-11",
    summary: {
      en: "Contributed to financial-system projects in a central bank environment, spanning blockchain infrastructure, ISO 20022 migration, testing, and workflow automation.",
      translated: {
        th: {
          value:
            "มีส่วนร่วมในโปรเจกต์ระบบการเงินภายในสภาพแวดล้อมของธนาคารกลาง ครอบคลุม blockchain infrastructure, ISO 20022 migration, testing และ workflow automation",
          status: "reviewed",
        },
      },
    },
    highlights: [
      {
        en: "Worked on DLTBond, a blockchain-based government bond platform using Angular, Node.js, Go, and Hyperledger Fabric; developed internal dashboards and maintained the system.",
        translated: {
          th: {
            value: "ทำงานในโปรเจกต์ DLTBond แพลตฟอร์มพันธบัตรรัฐบาลที่ใช้ blockchain พัฒนา dashboard ภายในและดูแลระบบ",
            status: "reviewed",
          },
        },
      },
      {
        en: "Supported ISO 20022 migration work through Java updates, requirements analysis, SWIFT-standard alignment, and system testing.",
        translated: {
          th: {
            value:
              "สนับสนุนงาน ISO 20022 migration ผ่านการปรับปรุง Java วิเคราะห์ requirements และทดสอบระบบ",
            status: "reviewed",
          },
        },
      },
      {
        en: "Automated repetitive operational workflows using UiPath RPA to reduce manual workload.",
        translated: {
          th: {
            value: "ทำ automation สำหรับ workflow ที่ทำซ้ำบ่อยด้วย UiPath RPA เพื่อลดงาน manual",
            status: "reviewed",
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
      translated: { th: { value: "Blockchain Developer", status: "approved" } },
    },
    organization: {
      en: "KBTG Develop Bootcamp 2019",
      translated: { th: { value: "KBTG Develop Bootcamp 2019", status: "approved" } },
    },
    location: {
      en: "Bangkok, Thailand",
      translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "approved" } },
    },
    startDate: "2019-06",
    endDate: "2019-08",
    summary: {
      en: "Built a blockchain proof of concept in an Agile bootcamp environment, combining React frontend work with Go backend development.",
      translated: {
        th: {
          value:
            "พัฒนา blockchain proof of concept ใน bootcamp แบบ Agile โดยทำทั้ง React frontend และ Go backend",
          status: "reviewed",
        },
      },
    },
    highlights: [
      {
        en: "Built Time Donation using React and a Go backend integrated with the Stellar SDK.",
        translated: {
          th: {
            value: "พัฒนา Time Donation ด้วย React และ Go backend ที่เชื่อมกับ Stellar SDK",
            status: "reviewed",
          },
        },
      },
      {
        en: "Developed the proof of concept through a 1-2 month team sprint focused on social-impact use cases.",
        translated: {
          th: {
            value:
              "พัฒนา proof of concept ด้าน social impact ร่วมกับทีมใน bootcamp ระยะเวลา 1-2 เดือน",
            status: "reviewed",
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
      translated: { th: { value: "Frontend Developer", status: "approved" } },
    },
    organization: {
      en: "BeID Corporation Co., Ltd.",
      translated: { th: { value: "BeID Corporation Co., Ltd.", status: "approved" } },
    },
    location: {
      en: "Bangkok, Thailand",
      translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "approved" } },
    },
    startDate: "2018-06",
    endDate: "2018-07",
    summary: {
      en: "Developed dashboard and landing-page interfaces.",
      translated: {
        th: { value: "พัฒนา interfaces สำหรับ dashboard และ landing page", status: "reviewed" },
      },
    },
    highlights: [
      {
        en: "Developed a dashboard and landing page using React.",
        translated: {
          th: { value: "พัฒนา dashboard และ landing page ด้วย React", status: "reviewed" },
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
      translated: { th: { value: "MSc Advanced Computer Science", status: "approved" } },
    },
    organization: {
      en: "University of Kent",
      translated: { th: { value: "University of Kent", status: "approved" } },
    },
    location: {
      en: "Canterbury, UK",
      translated: { th: { value: "Canterbury, UK", status: "approved" } },
    },
    startDate: "2024-09",
    endDate: "2025-09",
    summary: {
      en: "Completed an MSc in Advanced Computer Science with distinction.",
      translated: {
        th: {
          value: "สำเร็จการศึกษา MSc Advanced Computer Science ด้วยผลการเรียนระดับ distinction",
          status: "reviewed",
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
            status: "reviewed",
          },
        },
      },
      {
        en: "Built a cryptocurrency rug pull detection dissertation project.",
        translated: {
          th: {
            value: "พัฒนา dissertation project เกี่ยวกับการตรวจจับ cryptocurrency rug pull",
            status: "reviewed",
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
        th: { value: "B.Sc. Information and Communication Technology", status: "approved" },
      },
    },
    organization: {
      en: "Mahidol University",
      translated: { th: { value: "Mahidol University", status: "approved" } },
    },
    location: {
      en: "Nakhon Pathom, Thailand",
      translated: { th: { value: "นครปฐม ประเทศไทย", status: "approved" } },
    },
    startDate: "2015-07",
    endDate: "2019-06",
    summary: {
      en: "Studied Information and Communication Technology with a Database and Intelligent Systems focus.",
      translated: {
        th: {
          value:
            "ศึกษา Information and Communication Technology โดยเน้น Database และ Intelligent Systems",
          status: "reviewed",
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
            status: "reviewed",
          },
        },
      },
      {
        en: "Built a cultural heritage progressive web app as the senior project.",
        translated: {
          th: {
            value: "พัฒนา progressive web app ด้าน cultural heritage เป็น senior project",
            status: "reviewed",
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
      translated: { th: { value: "LL.B. Bachelor of Laws", status: "approved" } },
    },
    organization: {
      en: "Ramkhamhaeng University",
      translated: { th: { value: "Ramkhamhaeng University", status: "approved" } },
    },
    location: {
      en: "Bangkok, Thailand",
      translated: { th: { value: "กรุงเทพฯ ประเทศไทย", status: "approved" } },
    },
    startDate: "2015",
    endDate: "2023",
    summary: {
      en: "Studied law with coursework related to intellectual property, international trade, and computer-related law.",
      translated: {
        th: {
          value:
            "ศึกษากฎหมาย โดยมี coursework ที่เกี่ยวข้องกับทรัพย์สินทางปัญญา การค้าระหว่างประเทศ และกฎหมายเกี่ยวกับคอมพิวเตอร์",
          status: "reviewed",
        },
      },
    },
    highlights: [
      {
        en: "Built a cross-domain foundation connecting software, product risk, legal context, and people.",
        translated: {
          th: {
            value:
              "สร้างพื้นฐานข้ามสายงานที่ช่วยเชื่อมโยงซอฟต์แวร์ ความเสี่ยงของผลิตภัณฑ์ บริบททางกฎหมาย และผู้ใช้งาน",
            status: "reviewed",
          },
        },
      },
    ],
    skills: ["Law", "Intellectual Property", "Computer-Related Law"],
    tags: ["law", "intellectual-property", "computer-related-law", "academic"],
  },
] as const satisfies readonly Experience[];
