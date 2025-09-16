import type { Metadata } from "next";

import { Data, Contact } from "@/data/types/profile";

export const myName = "Napatchol Thaipanich";

export const data: Data = {
  name: myName,
  nickname: "Pat",
  position: "Software Developer",
  // position: "Machine Learning Intern",
  subtitle: `I am deeply passionate about language, technology and data. I desire to learn new things and share my passion through code. My motto is "If anyone can do it, I can do it." My grandfather passed down this lesson to my mother and me, and the lesson has stayed with me ever since. I make it a point to work daily to improve my coding skills.
  <br/>
  <br/>
  I am looking for an exciting project. <b>"Let's build something remarkable together!"</b>`,
  address:
    "432/38 Chapter One Midtown Condo Ladprao 24, Ladprao Road, Chomphon, Chatuchak, Bangkok, Thailand 10900",
  shortAddress: "Bangkok, Thailand",
  // shortAddress: "Canterbury, UK",
  summary:
    // "Passionate Software Developer with a background in technology and data. Committed to lifelong learning, I thrive on challenges and am driven by the belief that with determination, anything is possible. I am eager to contribute my skills and build innovative solutions that make a positive impact.",
    // "Passionate Machine Learning Intern with a strong curiosity for data-driven insights and AI innovation. Eager to explore new challenges in machine learning, model development, and optimization. Committed to continuous learning and applying cutting-edge techniques to create impactful and intelligent solutions.",
    // "MSc Advanced Computer Science student at the University of Kent, passionate about technology and data. Driven, curious, and eager to build impactful, innovative solutions through continuous learning and challenge.",
    "Passionate about technology and data. Curious, eager to build impactful, innovative solutions through continuous learning & challenge.",
  contact: {
    Tel: "+66-959-390-164",
    // Tel: "+44-758-744-6870",
    Email: [
      {
        name: "napatchol.tha@gmail.com",
        // name: "nt375@kent.ac.uk",
        opt: {
          link: "mailto:napatchol.tha@gmail.com?subject=%5Bpatorsiang%2Egithub%2Eio%5D contact by seeing the info from the CV&body=Name%3D%3CInsert Your Name%3E%0D%0ATel%3D%3CInsert Your Tel%3E%0D%0ADetail%3A%0D%0A",
          // link: "mailto:nt375@kent.ac.uk",
          underline: true,
          color: 0x569cd6,
        },
      },
      {
        name: "nt375@kent.ac.uk",
        opt: {
          link: "mailto:nt375@kent.ac.uk",
          underline: true,
          color: 0x569cd6,
        },
      },
    ],
    LinkedIn: {
      name: "napatchol-thaipanich",
      opt: {
        link: "https://www.linkedin.com/in/napatchol-thaipanich",
        underline: true,
        color: 0x569cd6,
      },
    },
    Github: {
      name: "patorsiang",
      opt: {
        link: "https://github.com/patorsiang",
        underline: true,
        color: 0x569cd6,
      },
    },
  },
  info: {
    "Education and Awards": [
      {
        // date: "14/09/2024 - 14/09/2026",
        date: "14/09/2024 - 14/09/2025",
        school: "School of Computing",
        university: "University of Kent",
        location: "Canterbury, UK",
        // degree: "MSc Advanced Computer Science with an Industrial Placement",
        degree: "MSc Advanced Computer Science",
        focus: [
          "Java",
          "Python",
          "Artificial Intelligence System Implementation",
          "Deep Learning",
          "Computer Security",
          "Introduction to Quantum Computing & Quantum Cryptography",
          "Internet of Things and Mobile Devices",
        ],
        projects: [
          {
            title: "Smart Shoe",
            skills: ["Arduino (C++)", "Next.js", "MQTT", "WebSocket"],
            description: [
              "Developed a smart shoe prototype using Arduino and sensors to monitor foot pressure, step count, and falling detection.",
              "Implemented a web app with bluetooth web API and mqtt (websocket) for real-time data visualization and analysis.",
            ],
            shortDescription:
              "Developed a smart shoe prototype using Arduino and sensors connected to a web app (next.js).",
            link: "https://github.com/patorsiang/smart-shoe",
          },
          {
            title: "Food 101 - Image Classification with EfficientNetV2",
            skills: ["Python", "TensorFlow", "EfficientNetV2"],
            description: [
              "Implemented an image classification model using EfficientNetV2 for the Food 101 dataset.",
            ],
            shortDescription:
              "Implemented an image classification model using EfficientNetV2 for the Food 101 dataset.",
            link: "https://github.com/patorsiang/AI-System---Food-Image-Classification-for-Nutritional-Estimation",
          },
          {
            title: "Vending-Machine",
            skills: ["Java", "OOP", "Design Patterns"],
            description: [
              "Developed a vending machine application using Java, implementing OOP principles and design patterns.",
            ],
            shortDescription:
              "Developed a vending machine application using Java, implementing OOP principles and design patterns.",
            link: "https://github.com/patorsiang/Java-Assignment-Vending-Machine",
          },
          {
            title: "RSA Encryption and Decryption",
            skills: ["Python", "RSA", "Cryptography"],
            description: [
              "Implemented RSA encryption and decryption algorithms in Python.",
            ],
            shortDescription:
              "Implemented RSA encryption and decryption algorithms in Python.",
            link: "https://github.com/patorsiang/ComSec-RSA-Assignment",
          },
          {
            title:
              "Automated Detection and Categorisation of Cryptocurrency Rug Pull Scams",
            skills: ["Python", "Machine Learning"],
            description: [
              "Developed a machine learning model to detect and categorize cryptocurrency rug pull scams.",
              "Developed an API interface and data parser for the model.",
              "Utilized various machine learning algorithms and techniques for data analysis.",
            ],
            shortDescription:
              "Developed a machine learning model to detect and categorize cryptocurrency rug pull scams.",
          },
        ],
      },
      {
        date: "2015 - 2023",
        school: "Faculty of Law",
        university: "Ramkhamhaeng University",
        location: "Bangkok, Thailand",
        degree: "Bachelor of Laws (LL.B.)",
        // gpa: "2.8",
        focus: [
          // "KOR1001 - KOR2002 Fundamental Korean",
          // "LAW3003 Civil and Commercial Law: Family",
          // "LAW3009 Civil and Commercial Law: Succession",
          // "LAW4009 Law on Intellectual Property 1",
          // "LAW4010 International Trade Law",
          // "LAW4053 Law Related to Computer",
          // "Fundamental Korean",
          "Civil and Commercial Law: Family",
          "Civil and Commercial Law: Succession",
          "Law on Intellectual Property",
          "International Trade Law",
          "Law Related to Computer",
        ],
      },
      {
        date: "2022",
        name: "Women Thailand Cyber Top Talent 2022 by NCSA & HUAWEI • Top 4",
      },
      {
        date: "2020",
        name: "CJE Hackathon 2020 Generation 1 by Botnoi Consulting • Top 3",
      },
      {
        date: "2015 - 2019",
        school: "Faculty of Information and Communication Technology",
        university: "Mahidol University",
        location: "Nakhon Pathom, Thailand",
        degree: "Bachelor of Science (B.Sc.)",
        major: "Database and Intelligent Systems (DB)",
        gpa: "3.18",
        focus: [
          "Web Programming",
          "Computer Organization and Architecture",
          "Data Structures and Algorithm Analysis",
          "Database Management Systems",
          "Information Storage and Retrieval",
          "Database Design",
          "Human-Computer Interface",
          "Digital Image processing",
        ],
      },
      {
        date: "2013 - 2015",
        school:
          "Kasetsart University Laboratory School, Center for Educational Research and Development",
        location: "Bangkok, Thailand",
        degree: "High School",
        major: "Science-Math",
      },
      {
        date: "2013",
        name: "Certificate of Merit, Class Distinction, The Royal Australian Chemical Institute",
      },
    ],
    "Work Experience": [
      {
        date: "06/2023 - 05/2024",
        title: "Frontend Developer",
        type: "Freelance",
        location: "Bangkok, Thailand",
        description: [
          "Collected client requirements by asking clients targeted questions to identify their requirements and preferences, including translating client words into technical specifications and suggested solutions.",
          "Delegated tasks, estimated timelines, and delivered completed projects.",
          "Developed, packaged, hosted, and maintained websites for clients.",
          "Examples: Maintained website for Pruxus, built a dashboard for Data Wow Co., Ltd.",
        ],
        shortDescription: [
          "Helped clients to get a solution by collecting requirements from them",
          "Created, Packed, Hosted, and Maintained a website.",
          "Example: Pruxus: maintained their website, Data Wow Co., Ltd.: built a dashboard for their client.",
        ],
      },
      {
        date: "12/2021 - 04/2023",
        title: "Frontend Developer",
        type: "Full-time",
        company: "Data Wow Co., Ltd.",
        location: "Bangkok, Thailand",
        description: [
          "Developed PDPA-related websites, including Cookie Wow, PDPA Pro, PDPA Prokit, and PDPA Learn.",
          "Built websites, dashboards, and online platforms for internal and external clients, including chat storage for Line Chatbot and online mock exam platforms.",
        ],
        shortDescription: [
          "Develop webs related to PDPA (Personal Data Protection Act)",
          "and others such as dashboards, chat storage (line chatbot), online mock exam platforms, etc.)",
        ],
      },
      {
        date: "11/2019 - 11/2021",
        title: "System Analyst",
        type: "Full-time",
        company: "Bank of Thailand",
        location: "Bangkok, Thailand",
        description: [
          "Led the design, development, and maintenance of DLTBond, utilizing blockchain technology to democratize government bond purchasing.",
          "Contributed to ISO20022 migration, including requirement analysis, planning, and system testing.",
          "Implemented Robotic Process Automation (RPA) using UiPath to optimize routine tasks and improve efficiency.",
        ],
        shortDescription: [
          "Developed government bonds selling core system for country",
          "Maintained the system for support new standard, ISO20022",
          "Created automatic process by UiPath as an RPA developer.",
        ],
      },
      {
        date: "06/2019 - 08/2019",
        title: "Blockchain Developer, KBTG Develop Bootcamp 2019",
        type: "Internship",
        company: "Kasikorn Business Technology Group (KBTG)",
        location: "Bangkok, Thailand",
        description: [
          "Developed Time D(onation), a blockchain-based project for volunteer service tracking and reward management using Stellar blockchain.",
        ],
        shortDescription: [
          "Setup POC project named the Time D(onation): using blockchain to solve the social problem.",
        ],
      },
      {
        date: "06/2018 - 07/2018",
        title: "Frontend Developer",
        type: "Internship",
        company: "BeID Corporation Co., Ltd.",
        location: "Bangkok, Thailand",
        description: ["Developed a dashboard and landing page using React.js."],
        shortDescription: [
          "About developing a dashboard and landing page in React.JS",
        ],
      },
    ],
    "Extra-Curricular Activities": [
      {
        date: "2020 - Current",
        name: "Member of Sec-Girl",
        description: [
          "Sec-Girl is the community that includes female cyber security stakeholders in order to share knowledge and encourage women in Thailand to work in the cyber security sector.",
          "Volunteering in a public cyber security workshop attracts 50 - 100 participants, which anyone with basic knowledge can join by registering.",
          "Joined cyber security competitions on behalf of Sec-Girl, such as Women Thailand Cyber Top Talent 2022 by NCSA & HUAWEI.",
        ],
      },
      {
        date: "2023",
        name: "Selected to participate in the competition Line Hack 2023, reaching the final round in the general public category as 1 of the top 8 teams.",
      },
      {
        date: "2021",
        name: 'Selected to participate in the competition "13th Find the Best Telecommunications and ICT Skills in Honor of His Majesty", reaching the final round in the general public category as 1 of the top 30 teams',
      },
      {
        date: "2018",
        name: 'Participated in the "Group Corporate Website Design Contest Activity" organized by Samut Sakhon Phatthana Mueang (Social Enterprise) in collaboration with MUICT',
      },
    ],
  },
  etc: {
    "Computer Skills": {
      Language:
        "Javascript, Python, HTML, Java, PHP, TypeScript, Go (Programming Language), C++, CSS, Tailwind CSS, SQL",
      Framework:
        "React.js, Vue.js, Angular.js, Next.js, Node.js, Express.js, UiPath",
      Hosting:
        "AWS Amplify, IBM Cloud, Firebase, GCP (Google Cloud Platform), Microsoft Azure",
      Blockchain: "IBM Hyperledger Fabric, Stellar Blockchain",
      Database:
        "Redis, MongoDB, PostgreSQL, MSSQL, ER Diagram, Database Design",
      "Queue Management": "RabbitMQ",
    },
    Languages: {
      English: "IELTS: band 6",
      Korean: "TOPIK: level 1; Sejong: 2A",
      Thai: "mother tongue",
    },
    Interests: [
      "Law",
      "CTF (Capture The Flag)",
      "Piano",
      "Photographing",
      "Traveling (experience includes Macau, Hong Kong, Japan, Singapore)",
      "Cooking",
      "Table Tennis",
      "Badminton",
      "Swimming",
    ],
  },
  references: [
    {
      Title: "Asst. Prof. Dr.",
      Name: "Charnyote",
      Surname: "Pluempitiwiriyawej",
      Position: "ASSISTANT PROFESSOR",
      "Workplace Address": `Faculty of ICT, Mahidol University
999 Phuttamonthon 4 Road, Salaya , Nakhon Pathom 73170 THAILAND`,
      "Contact Number": "+66 2 441 0909",
      "Email (Official)":
        "charnyote.plu@mahidol.ac.th; charnyote.plu@mahidol.edu",
    },

    {
      Title: "Dr.",
      Name: "Woraluck",
      Surname: "Wongse-ek",
      Position: "INSTRUCTOR",
      "Workplace Address": `Faculty of ICT, Mahidol University
999 Phuttamonthon 4 Road, Salaya , Nakhon Pathom 73170 THAILAND`,
      "Contact Number": "+66 2 441 0909",
      "Email (Official)":
        "woraluck.won@mahidol.ac.th; woraluck.won@mahidol.edu",
    },
  ],
  sortedInfoForVacancy: [
    "Work Experience",
    "Education and Awards",
    "Extra-Curricular Activities",
  ],
  sortedInfoForEducation: [
    "Education and Awards",
    "Work Experience",
    "Extra-Curricular Activities",
  ],
};

export const metadata: Metadata = {
  title: myName,
  description: `${myName}'s Profile`,
  generator: "Next.js",
  keywords: [myName],
  authors: [
    { name: myName },
    {
      name: myName,
      url: (data.contact.LinkedIn as Contact).opt.link,
    },
  ],
};
