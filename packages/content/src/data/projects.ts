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
      en: "Research prototype that analyzes smart contracts, blockchain activity, and anomaly signals to flag suspected DeFi rug pulls.",
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
        en: "Built a React/Vite and FastAPI workflow for contract address intake, feature extraction, and prediction review.",
      },
      {
        en: "Combined source, bytecode/opcode, transaction timeline, tabular ML, and anomaly-detection signals.",
      },
      { en: "Used Redis and Docker Compose to coordinate backend services and local experiment runs." },
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
    problem: {
      en: "DeFi rug-pull scams can hide risky behaviour across smart-contract source code, bytecode, transaction timelines, and anomaly patterns, making manual inspection difficult and time-consuming.",
    },
    audience: {
      en: "Academic reviewers, blockchain security learners, and builders exploring ML-assisted contract risk analysis.",
    },
    keyLearning: [
      {
        en: "Heterogeneous blockchain evidence needs a pipeline that can normalize Etherscan/local data into source, opcode, tabular, and timeline features.",
      },
      {
        en: "Prediction fusion is useful when separate ML and anomaly heads capture different risk patterns, but the result depends heavily on dataset provenance and metrics.",
      },
    ],
    testingNotes: {
      en: "Research prototype only; not production security tooling or financial advice. Public release needs stronger dataset provenance, license documentation, and exact model metrics.",
    },
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
      en: "IoT smart shoe prototype that collects force and motion data from an ESP32 device and visualizes live step, balance, and fall-risk signals.",
      translated: {
        th: {
          value:
            "ต้นแบบ Arduino sensor ที่เชื่อมกับ Next.js app สำหรับ real-time gait monitoring และ fall detection",
          status: "ai_draft",
        },
      },
    },
    role: { en: "Developer", translated: { th: { value: "Developer", status: "ai_draft" } } },
    techStack: ["C++", "Next.js", "Arduino", "ESP32", "BLE", "MQTT"],
    tags: ["iot", "web", "frontend", "nextjs", "software-engineering"],
    highlights: [
      {
        en: "Collected pressure and motion readings with force sensors, an MPU6050, and ESP32 firmware.",
      },
      { en: "Implemented filtering and threshold logic for step, fall, and balance events." },
      { en: "Published readings through BLE notifications and MQTT into a live Next.js dashboard." },
    ],
    links: [
      {
        label: { en: "GitHub", translated: { th: { value: "GitHub", status: "ai_draft" } } },
        url: "https://github.com/patorsiang/smart-shoe",
      },
    ],
    placement: "featured-project",
    contributionType: "academic",
    timeframe: { en: "2025" },
    problem: {
      en: "Movement, pressure balance, and fall-risk signals are difficult to observe continuously without combining sensors, embedded logic, wireless communication, and interface design.",
    },
    audience: {
      en: "Academic evaluators, IoT learners, and product teams exploring wearable sensing prototypes.",
    },
    keyLearning: [
      {
        en: "Explainable threshold logic works well for an academic prototype, but it depends on calibration, sensor placement, and noise handling.",
      },
      {
        en: "A useful wearable demo needs the full path from embedded readings to wireless transport, dashboard state, battery status, alerts, force distribution, and motion views.",
      },
    ],
    testingNotes: {
      en: "Academic prototype only; not a medical or safety device. Results are sensitive to sensor placement, calibration, noise, and hardware reliability.",
    },
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
      en: "Computer-vision experiment using Food-101 and EfficientNetV2B2 transfer learning to test food recognition for a future nutrition-estimation pipeline.",
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
      { en: "Trained an EfficientNetV2B2 transfer-learning model on the 101-class Food-101 dataset." },
      {
        en: "Evaluated on 25,250 samples with 0.8493 accuracy and 0.8488 macro F1.",
      },
      { en: "Mapped the classification task to the first stage of a nutrition-estimation product path." },
    ],
    links: [
      {
        label: { en: "GitHub", translated: { th: { value: "GitHub", status: "ai_draft" } } },
        url: "https://github.com/patorsiang/AI-System---Food-Image-Classification-for-Nutritional-Estimation",
      },
    ],
    placement: "project",
    contributionType: "academic",
    timeframe: { en: "2025" },
    problem: {
      en: "Food recognition is a first step toward nutrition estimation, but calories and nutrients require reliable classification plus future portion-size and nutrition database work.",
    },
    audience: {
      en: "Academic reviewers and ML/product teams evaluating the feasibility of food-image recognition for nutrition tools.",
    },
    keyLearning: [
      {
        en: "Transfer learning can produce strong Food-101 classification results without training a large vision model from scratch.",
      },
      {
        en: "The model is a solid ML experiment, but product readiness depends on portion-size estimation, nutrition database integration, and an app or API layer.",
      },
    ],
    testingNotes: {
      en: "Evaluated on 25,250 Food-101 samples with 0.8493 accuracy and 0.8488 macro F1; nutrition database integration, portion-size estimation, and app/API delivery are not complete.",
    },
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
    placement: "project",
    contributionType: "academic",
    timeframe: { en: "2019" },
  },
] as const satisfies readonly Project[];
