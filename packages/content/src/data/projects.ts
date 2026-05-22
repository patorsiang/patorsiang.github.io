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
    title: "Cryptocurrency Rug Pull Detection",
    slug: "cryptocurrency-rug-pull-detection",
    category: "ai-ml",
    status: "prototype",
    summary: "Machine-learning system to detect and categorize fraudulent blockchain projects.",
    role: "Designer and developer",
    techStack: ["FastAPI", "Python", "React", "Redis", "TensorFlow", "Docker"],
    highlights: [
      "Designed an applied machine-learning workflow for cryptocurrency rug pull detection.",
      "Built a full-stack prototype connecting model output with a web interface.",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/patorsiang/rugpull-detection-msc-kent-2025",
      },
    ],
    placement: "featured-project",
    contributionType: "academic",
    timeframe: "2025",
  },
  {
    id: "project.smart-shoe",
    locale: "en",
    source: {
      ...legacyProfileSource,
      url: "https://github.com/patorsiang/smart-shoe",
    },
    visibility: "public",
    title: "Smart Shoe Prototype",
    slug: "smart-shoe-prototype",
    category: "iot",
    status: "prototype",
    summary:
      "Arduino sensor prototype integrated with a Next.js app for real-time gait monitoring and fall detection.",
    role: "Developer",
    techStack: ["C++", "Next.js", "Arduino"],
    highlights: [
      "Connected hardware sensor data with a web application.",
      "Explored real-time gait monitoring and fall-detection workflows.",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/patorsiang/smart-shoe",
      },
    ],
    placement: "project",
    contributionType: "academic",
    timeframe: "2025",
  },
  {
    id: "project.food101-classification",
    locale: "en",
    source: {
      ...legacyProfileSource,
      url: "https://github.com/patorsiang/AI-System---Food-Image-Classification-for-Nutritional-Estimation",
    },
    visibility: "public",
    title: "Food101 Image Classification",
    slug: "food101-image-classification",
    category: "ai-ml",
    status: "archived",
    summary:
      "Transfer-learning image classification project using EfficientNetV2 on a 100K-image food dataset.",
    role: "Developer",
    techStack: ["Python", "TensorFlow", "Transfer Learning"],
    highlights: [
      "Implemented transfer learning with EfficientNetV2.",
      "Explored image classification as a foundation for nutritional-estimation workflows.",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/patorsiang/AI-System---Food-Image-Classification-for-Nutritional-Estimation",
      },
    ],
    placement: "playground",
    contributionType: "academic",
    timeframe: "2025",
  },
  {
    id: "project.vending-machine-simulator",
    locale: "en",
    source: {
      ...legacyProfileSource,
      url: "https://github.com/patorsiang/Java-Assignment-Vending-Machine",
    },
    visibility: "public",
    title: "Vending Machine Simulator",
    slug: "vending-machine-simulator",
    category: "academic",
    status: "archived",
    summary: "Java OOP simulator for transactions and inventory management.",
    role: "Developer",
    techStack: ["Java", "OOP"],
    highlights: [
      "Modelled transaction and inventory flows with object-oriented design.",
      "Practised applying design patterns in a small Java system.",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/patorsiang/Java-Assignment-Vending-Machine",
      },
    ],
    placement: "playground",
    contributionType: "academic",
    timeframe: "2025",
  },
  {
    id: "project.rsa-cryptosystem",
    locale: "en",
    source: {
      ...legacyProfileSource,
      url: "https://github.com/patorsiang/ComSec-RSA-Assignment",
    },
    visibility: "public",
    title: "RSA Cryptosystem",
    slug: "rsa-cryptosystem",
    category: "security-ctf",
    status: "archived",
    summary:
      "Python implementation of RSA encryption and decryption for cryptography fundamentals.",
    role: "Developer",
    techStack: ["Python", "RSA", "Cryptography"],
    highlights: [
      "Implemented RSA encryption and decryption in Python.",
      "Practised core cryptography concepts through a focused assignment.",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/patorsiang/ComSec-RSA-Assignment",
      },
    ],
    placement: "playground",
    contributionType: "academic",
    timeframe: "2025",
  },
  {
    id: "project.chi-cultural-heritage-pwa",
    locale: "en",
    source: {
      ...legacyProfileSource,
      url: "https://github.com/patorsiang/chi",
    },
    visibility: "public",
    title: "CHI Cultural Heritage PWA",
    slug: "chi-cultural-heritage-pwa",
    category: "web",
    status: "launched",
    summary: "Progressive web app for cultural knowledge exchange about Indian heritage.",
    role: "Developer",
    techStack: ["PWA", "JavaScript", "Node.js", "MongoDB"],
    highlights: [
      "Built offline-capable web and mobile experiences.",
      "Collaborated across Mahidol University's ICT faculty and the Institute for Languages and Cultures of Asia.",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/patorsiang/chi",
      },
    ],
    placement: "featured-project",
    contributionType: "academic",
    timeframe: "2019",
  },
] as const satisfies readonly Project[];
