import { legacyProfileSource } from "./shared";
import type { Project } from "../types";

export const projects = [
  {
    id: "project.rugpull-detection",
    locale: "en",
    source: {
      ...legacyProfileSource,
      url: "https://github.com/patorsiang/rugpull-detection-msc-kent-2025",
    },
    visibility: "public",
    title: {
      en: "Cryptocurrency Rug Pull Detection",
      translated: { th: { value: "Cryptocurrency Rug Pull Detection", status: "ai_draft" } },
    },
    slug: "cryptocurrency-rug-pull-detection",
    category: "ai-ml",
    status: "prototype",
    summary: {
      en: "Machine-learning system to detect and categorize fraudulent blockchain projects.",
      translated: {
        th: {
          value:
            "ระบบ machine learning สำหรับตรวจจับและจัดหมวดหมู่โปรเจกต์ blockchain ที่มีลักษณะหลอกลวง",
          status: "ai_draft",
        },
      },
    },
    role: {
      en: "Designer and developer",
      translated: { th: { value: "Designer และ developer", status: "ai_draft" } },
    },
    techStack: ["FastAPI", "Python", "React", "Redis", "TensorFlow", "Docker"],
    tags: [
      "ai",
      "machine-learning",
      "python",
      "backend",
      "frontend",
      "web",
      "blockchain",
      "software-engineering",
    ],
    highlights: [
      {
        en: "Designed an applied machine-learning workflow for cryptocurrency rug pull detection.",
      },
      {
        en: "Built a full-stack prototype connecting model output with a web interface.",
      },
    ],
    links: [
      {
        label: { en: "GitHub", translated: { th: { value: "GitHub", status: "ai_draft" } } },
        url: "https://github.com/patorsiang/rugpull-detection-msc-kent-2025",
      },
    ],
    placement: "featured-project",
    contributionType: "academic",
    timeframe: { en: "2025" },
  },
  {
    id: "project.smart-shoe",
    locale: "en",
    source: {
      ...legacyProfileSource,
      url: "https://github.com/patorsiang/smart-shoe",
    },
    visibility: "public",
    title: {
      en: "Smart Shoe Prototype",
      translated: { th: { value: "Smart Shoe Prototype", status: "ai_draft" } },
    },
    slug: "smart-shoe-prototype",
    category: "iot",
    status: "prototype",
    summary: {
      en: "Arduino sensor prototype integrated with a Next.js app for real-time gait monitoring and fall detection.",
      translated: {
        th: {
          value:
            "ต้นแบบ Arduino sensor ที่เชื่อมกับ Next.js app สำหรับ real-time gait monitoring และ fall detection",
          status: "ai_draft",
        },
      },
    },
    role: { en: "Developer", translated: { th: { value: "Developer", status: "ai_draft" } } },
    techStack: ["C++", "Next.js", "Arduino"],
    tags: ["iot", "web", "frontend", "nextjs", "software-engineering"],
    highlights: [
      { en: "Connected hardware sensor data with a web application." },
      {
        en: "Explored real-time gait monitoring and fall-detection workflows.",
      },
    ],
    links: [
      {
        label: { en: "GitHub", translated: { th: { value: "GitHub", status: "ai_draft" } } },
        url: "https://github.com/patorsiang/smart-shoe",
      },
    ],
    placement: "project",
    contributionType: "academic",
    timeframe: { en: "2025" },
  },
  {
    id: "project.food101-classification",
    locale: "en",
    source: {
      ...legacyProfileSource,
      url: "https://github.com/patorsiang/AI-System---Food-Image-Classification-for-Nutritional-Estimation",
    },
    visibility: "public",
    title: {
      en: "Food101 Image Classification",
      translated: { th: { value: "Food101 Image Classification", status: "ai_draft" } },
    },
    slug: "food101-image-classification",
    category: "ai-ml",
    status: "archived",
    summary: {
      en: "Transfer-learning image classification project using EfficientNetV2 on a 100K-image food dataset.",
      translated: {
        th: {
          value:
            "โปรเจกต์ image classification แบบ transfer learning โดยใช้ EfficientNetV2 กับ food dataset ขนาด 100K รูป",
          status: "ai_draft",
        },
      },
    },
    role: { en: "Developer", translated: { th: { value: "Developer", status: "ai_draft" } } },
    techStack: ["Python", "TensorFlow", "Transfer Learning"],
    tags: [
      "ai",
      "machine-learning",
      "deep-learning",
      "computer-vision",
      "python",
      "tensorflow",
      "academic",
    ],
    highlights: [
      { en: "Implemented transfer learning with EfficientNetV2." },
      {
        en: "Explored image classification as a foundation for nutritional-estimation workflows.",
      },
    ],
    links: [
      {
        label: { en: "GitHub", translated: { th: { value: "GitHub", status: "ai_draft" } } },
        url: "https://github.com/patorsiang/AI-System---Food-Image-Classification-for-Nutritional-Estimation",
      },
    ],
    placement: "playground",
    contributionType: "academic",
    timeframe: { en: "2025" },
  },
  {
    id: "project.vending-machine-simulator",
    locale: "en",
    source: {
      ...legacyProfileSource,
      url: "https://github.com/patorsiang/Java-Assignment-Vending-Machine",
    },
    visibility: "public",
    title: {
      en: "Vending Machine Simulator",
      translated: { th: { value: "Vending Machine Simulator", status: "ai_draft" } },
    },
    slug: "vending-machine-simulator",
    category: "academic",
    status: "archived",
    summary: {
      en: "Java OOP simulator for transactions and inventory management.",
      translated: {
        th: {
          value: "Java OOP simulator สำหรับ transaction และ inventory management",
          status: "ai_draft",
        },
      },
    },
    role: { en: "Developer", translated: { th: { value: "Developer", status: "ai_draft" } } },
    techStack: ["Java", "OOP"],
    tags: ["software-engineering", "java", "oop", "academic"],
    highlights: [
      {
        en: "Modelled transaction and inventory flows with object-oriented design.",
      },
      { en: "Practised applying design patterns in a small Java system." },
    ],
    links: [
      {
        label: { en: "GitHub", translated: { th: { value: "GitHub", status: "ai_draft" } } },
        url: "https://github.com/patorsiang/Java-Assignment-Vending-Machine",
      },
    ],
    placement: "playground",
    contributionType: "academic",
    timeframe: { en: "2025" },
  },
  {
    id: "project.rsa-cryptosystem",
    locale: "en",
    source: {
      ...legacyProfileSource,
      url: "https://github.com/patorsiang/ComSec-RSA-Assignment",
    },
    visibility: "public",
    title: {
      en: "RSA Cryptosystem",
      translated: { th: { value: "RSA Cryptosystem", status: "ai_draft" } },
    },
    slug: "rsa-cryptosystem",
    category: "security-ctf",
    status: "archived",
    summary: {
      en: "Python implementation of RSA encryption and decryption for cryptography fundamentals.",
      translated: {
        th: {
          value:
            "การ implement RSA encryption และ decryption ด้วย Python เพื่อฝึกพื้นฐาน cryptography",
          status: "ai_draft",
        },
      },
    },
    role: { en: "Developer", translated: { th: { value: "Developer", status: "ai_draft" } } },
    techStack: ["Python", "RSA", "Cryptography"],
    tags: ["security", "cryptography", "python", "academic"],
    highlights: [
      { en: "Implemented RSA encryption and decryption in Python." },
      {
        en: "Practised core cryptography concepts through a focused assignment.",
      },
    ],
    links: [
      {
        label: { en: "GitHub", translated: { th: { value: "GitHub", status: "ai_draft" } } },
        url: "https://github.com/patorsiang/ComSec-RSA-Assignment",
      },
    ],
    placement: "playground",
    contributionType: "academic",
    timeframe: { en: "2025" },
  },
  {
    id: "project.chi-cultural-heritage-pwa",
    locale: "en",
    source: {
      ...legacyProfileSource,
      url: "https://github.com/patorsiang/chi",
    },
    visibility: "public",
    title: {
      en: "CHI Cultural Heritage PWA",
      translated: { th: { value: "CHI Cultural Heritage PWA", status: "ai_draft" } },
    },
    slug: "chi-cultural-heritage-pwa",
    category: "web",
    status: "launched",
    summary: {
      en: "Progressive web app for cultural knowledge exchange about Indian heritage.",
      translated: {
        th: {
          value: "Progressive web app สำหรับแลกเปลี่ยนความรู้ด้านมรดกวัฒนธรรมอินเดีย",
          status: "ai_draft",
        },
      },
    },
    role: { en: "Developer", translated: { th: { value: "Developer", status: "ai_draft" } } },
    techStack: ["PWA", "JavaScript", "Node.js", "MongoDB"],
    tags: [
      "web",
      "frontend",
      "backend",
      "javascript",
      "nodejs",
      "database",
      "software-engineering",
    ],
    highlights: [
      { en: "Built offline-capable web and mobile experiences." },
      {
        en: "Collaborated across Mahidol University's ICT faculty and the Institute for Languages and Cultures of Asia.",
      },
    ],
    links: [
      {
        label: { en: "GitHub", translated: { th: { value: "GitHub", status: "ai_draft" } } },
        url: "https://github.com/patorsiang/chi",
      },
    ],
    placement: "featured-project",
    contributionType: "academic",
    timeframe: { en: "2019" },
  },
] as const satisfies readonly Project[];
