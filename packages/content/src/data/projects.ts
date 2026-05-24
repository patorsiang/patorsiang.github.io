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
    title: { en: "Cryptocurrency Rug Pull Detection" },
    slug: "cryptocurrency-rug-pull-detection",
    category: "ai-ml",
    status: "prototype",
    summary: {
      en: "Machine-learning system to detect and categorize fraudulent blockchain projects.",
    },
    role: { en: "Designer and developer" },
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
        label: { en: "GitHub" },
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
    title: { en: "Smart Shoe Prototype" },
    slug: "smart-shoe-prototype",
    category: "iot",
    status: "prototype",
    summary: {
      en: "Arduino sensor prototype integrated with a Next.js app for real-time gait monitoring and fall detection.",
    },
    role: { en: "Developer" },
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
        label: { en: "GitHub" },
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
    title: { en: "Food101 Image Classification" },
    slug: "food101-image-classification",
    category: "ai-ml",
    status: "archived",
    summary: {
      en: "Transfer-learning image classification project using EfficientNetV2 on a 100K-image food dataset.",
    },
    role: { en: "Developer" },
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
        label: { en: "GitHub" },
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
    title: { en: "Vending Machine Simulator" },
    slug: "vending-machine-simulator",
    category: "academic",
    status: "archived",
    summary: {
      en: "Java OOP simulator for transactions and inventory management.",
    },
    role: { en: "Developer" },
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
        label: { en: "GitHub" },
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
    title: { en: "RSA Cryptosystem" },
    slug: "rsa-cryptosystem",
    category: "security-ctf",
    status: "archived",
    summary: {
      en: "Python implementation of RSA encryption and decryption for cryptography fundamentals.",
    },
    role: { en: "Developer" },
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
        label: { en: "GitHub" },
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
    title: { en: "CHI Cultural Heritage PWA" },
    slug: "chi-cultural-heritage-pwa",
    category: "web",
    status: "launched",
    summary: {
      en: "Progressive web app for cultural knowledge exchange about Indian heritage.",
    },
    role: { en: "Developer" },
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
        label: { en: "GitHub" },
        url: "https://github.com/patorsiang/chi",
      },
    ],
    placement: "featured-project",
    contributionType: "academic",
    timeframe: { en: "2019" },
  },
] as const satisfies readonly Project[];
