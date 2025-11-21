import type { Metadata } from "next";

import { Data, Contact } from "@/data/types/profile";

export const myName = "Napatchol Thaipanich";

export const data: Data = {
  name: myName,
  nickname: "Pat",
  position: "Software Developer",
  subtitle: `ฉันคือ “ภัทร” ณภัทรชล ไทพานิชย์ นักพัฒนาซอฟต์แวร์และนักศึกษาปริญญาโทสาขาวิทยาการคอมพิวเตอร์ขั้นสูงที่ University of Kent (คาดว่าจะสำเร็จการศึกษาในปี 2025)
ฉันมีประสบการณ์ทำงานกว่า 3 ปีในตำแหน่ง Frontend Developer ที่ Data Wow Co., Ltd. และธนาคารแห่งประเทศไทย พัฒนาระบบฟินเทค แพลตฟอร์ม PDPA และแดชบอร์ดที่ใช้ทั้งภายในและสำหรับลูกค้า
<br/>
<br/>
ทักษะทางเทคนิคของฉันประกอบด้วย React, Next.js, JavaScript/TypeScript, Python (FastAPI, TensorFlow, scikit-learn) รวมถึงคลาวด์แพลตฟอร์ม (AWS, GCP, Azure) นอกจากนี้ยังมีประสบการณ์ทำโครงการด้าน Machine Learning (การจำแนกภาพ, การตรวจจับการฉ้อโกงบนบล็อกเชน), การสร้างต้นแบบ IoT และการเข้ารหัสลับ
<br/>
<br/>
นอกเหนือจากสายเทคนิค ฉันยังจบการศึกษาปริญญาตรีด้าน ICT จากมหาวิทยาลัยมหิดล และปริญญาตรีนิติศาสตร์จากมหาวิทยาลัยรามคำแหง ทำให้ฉันมีมุมมองแบบสหวิทยาการที่เชื่อมโยงระหว่างเทคโนโลยี ความปลอดภัย และกฎหมาย
<br/>
<br/>
ฉันหลงใหลในเทคโนโลยีและข้อมูลอย่างลึกซึ้ง คติที่ได้รับมาจากคุณปู่คือ “ถ้าใครทำได้ ฉันก็ทำได้” และฉันใช้แนวคิดนี้ในทุก ๆ วัน ทั้งการเขียนโค้ด การแข่งขัน CTF และการเรียนรู้อย่างต่อเนื่อง
<br/>
<br/>
ในอนาคต ฉันเปิดรับโอกาสด้านการพัฒนาซอฟต์แวร์ Machine Learning และ Cybersecurity ทั้งในประเทศไทย สหราชอาณาจักร สหภาพยุโรป สิงคโปร์ และออสเตรเลีย <b>มาสร้างสิ่งที่ยอดเยี่ยมไปด้วยกัน!</b>`,
  address: "Bangkok, Thailand | University of Kent, Canterbury, UK",
  contact: {
    Tel: "+66-959-390-164 (WhatsApp, Line, Telegram)",
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
    ],
    LinkedIn: {
      name: "linkedin.com/in/napatchol-thaipanich",
      opt: {
        link: "https://www.linkedin.com/in/napatchol-thaipanich",
        underline: true,
        color: 0x569cd6,
      },
    },
    Github: {
      name: "github.com/patorsiang",
      opt: {
        link: "https://github.com/patorsiang",
        underline: true,
        color: 0x569cd6,
      },
    },
  },
  history: {
    Education: [
      {
        degree: "MSc Advanced Computer Science (Distinction)",
        school: "School of Computing",
        university: "University of Kent",
        location: "Canterbury, UK",
        date: "09/2024 - 09/2025",
        modules: [
          "Introduction to Quantum Computing & Quantum Cryptography",
          "Introduction to Artificial Intelligence",
          "AI Systems Implementation",
          "Programming for Artificial Intelligence",
          "Internet of Things and Mobile Devices",
          "Deep Learning",
          "Advanced Java for Programmers",
          "Computer Security",
        ],
        project: [
          {
            title: "Cryptocurrency Rug Pull Detection",
            desc: "Designed a machine learning system to detect and categorize fraudulent blockchain projects.",
            tag: "Dissertation",
            skill: [
              "Fast API",
              "Python",
              "React.js",
              "Redis",
              "TensorFlow",
              "Docker",
            ],
            url: "https://github.com/patorsiang/rugpull-detection-msc-kent-2025",
          },
          {
            title: "Smart Shoe Prototype",
            desc: "Built a smart shoe with Arduino sensors, integrated with a Next.js app for real-time gait monitoring and fall detection.",
            tag: "Internet of Things and Mobile Devices",
            skill: ["C++", "Next.js"],
            url: "https://github.com/patorsiang/smart-shoe",
          },
          {
            title: "Food101 Image Classification",
            desc: "Implemented transfer learning with EfficientNetV2, achieving high accuracy on a 100K-image dataset.",
            tag: "AI Systems Implementation",
            skill: ["Python", "TensorFlow"],
            url: "https://github.com/patorsiang/AI-System---Food-Image-Classification-for-Nutritional-Estimation",
          },
          {
            title: "Vending Machine Simulator",
            desc: "Developed a Java OOP system with design patterns to model transactions and inventory management.",
            tag: "OOP",
            skill: ["Java"],
            url: "https://github.com/patorsiang/Java-Assignment-Vending-Machine",
          },
          {
            title: "RSA Cryptosystem",
            desc: "Implemented RSA encryption/decryption in Python to demonstrate cryptographic fundamentals.",
            tag: "Cryptography",
            skill: ["Python"],
            url: "https://github.com/patorsiang/ComSec-RSA-Assignment",
          },
        ],
      },
      {
        degree: "B.Sc. Information & Communication Technology",
        school: "Faculty of Information and Communication Technology",
        university: "Mahidol University",
        location: "Nakhon Pathom, Thailand",
        major: "Database & Intelligent Systems",
        date: "07/2015 - 06/2019",
        GPA: "3.18/4.00",
        modules: [
          "Problem Solving Techniques",
          "Web Programming",
          "Human Computer Interface",
          "Digital Image Processing",
          "Database Design",
          "Information Storage & Retrieval",
          "Computer Organization & Architecture",
          "Data Structure & Algorithm Analysis",
        ],
        project: [
          {
            title: "CHI - Cultural Heritage Progressive Web App",
            desc: "Developed a progressive web application (PWA) enabling cultural knowledge exchange about Indian heritage. The app runs on web and mobile devices, supports offline use, and was built as a collaboration between Mahidol University’s ICT faculty and the Institute for Languages and Cultures of Asia (Bharat Center).",
            tag: "Senior Project",
            skill: ["PWA", "JavaScript", "Node.js", "MongoDB"],
            url: "https://github.com/patorsiang/chi",
          },
        ],
      },
      {
        degree: "LL.B. Bachelor of Laws",
        school: "Faculty of Law",
        university: "Ramkhamhaeng University",
        location: "Bangkok, Thailand",
        date: "2015 - 2023",
        modules: [
          "Civil and Commercial Law: Family",
          "Civil and Commercial Law: Succession",
          "Law on Intellectual Property",
          "International Trade Law",
          "Law Related to Computer",
        ],
      },
      {
        degree: "High School",
        school:
          "Kasetsart University Laboratory School, Center for Educational Research and Development",
        location: "Bangkok, Thailand",
        major: "Science-Math",
        date: "2013 - 2015",
      },
    ],
    "Work Experience": [
      {
        date: "06/2023 - 05/2024",
        title: "Frontend Developer",
        type: "Freelance",
        location: "Bangkok, Thailand",
        desc: [
          "Collected client requirements and translated them into technical specifications and solutions.",
          "Designed, built, and deployed responsive websites using React.js, Next.js, and cloud hosting platforms.",
          "Maintained corporate website for Pruxus and built a client analytics dashboard for Data Wow.",
        ],
      },
      {
        date: "12/2021 - 04/2023",
        title: "Frontend Developer",
        type: "Full-time",
        company: "Data Wow Co., Ltd.",
        location: "Bangkok, Thailand",
        desc: [
          "Built PDPA compliance platforms (Cookie Wow, PDPA Pro) using modern frameworks, improving user access to privacy controls.",
          "Designed dashboards and online platforms, including chat storage systems for LINE bots and mock exam platforms, with real-time data handling.",
          "Worked in agile teams, delivering production-ready code under strict deadlines.",
        ],
      },
      {
        date: "11/2019 - 11/2021",
        title: "System Analyst",
        type: "Full-time",
        company: "Bank of Thailand",
        location: "Bangkok, Thailand",
        desc: [
          "Contributed to DLTBond, a blockchain-based government bond platform, ensuring scalability and security for thousands of users.",
          "Contributed to ISO 20022 migration, analyzing requirements and performing system testing.",
          "Automated workflows using UiPath RPA, reducing repetitive manual tasks workloads",
        ],
      },
      {
        date: "06/2019 - 08/2019",
        title: "Blockchain Developer, KBTG Develop Bootcamp 2019",
        type: "Internship",
        company: "Kasikorn Business Technology Group (KBTG)",
        location: "Bangkok, Thailand",
        desc: [
          "Designed and implemented Time Donation, a blockchain proof-of-concept application developed collaboratively in an Agile team within 3 months, showcasing research-driven application of Stellar technology to social impact.",
        ],
      },
      {
        date: "06/2018 - 07/2018",
        title: "Frontend Developer",
        type: "Internship",
        company: "BeID Corporation Co., Ltd.",
        location: "Bangkok, Thailand",
        desc: ["Developed a dashboard and landing page using React.js."],
      },
    ],
    "Awards & Activities": {
      "Cybersecurity Competitions": [
        {
          title: "Top 4 - Women Thailand Cyber Top Talent 2022 (NCSA & Huawei)",
        },
      ],
      Hackathon: [
        { title: "Finalist - LINE Hack 2023 (Top 8 teams)" },
        { title: "3rd Place - CJE Hackathon 2020 (Botnoi Consulting)" },
      ],
      Community: [
        {
          title:
            "Active member of Sec-Girl, a women-in-cybersecurity group, volunteering in public workshops",
        },
      ],
    },
    Skill: {
      "Programming & Fundamentals": [
        "Java",
        "Python",
        "JavaScript/TypeScript",
        "C++",
        "Go",
        "SQL",
        "CSS",
        "HTML",
        "OOP",
      ],
      "Frameworks & Tools": [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "FastAPI",
        "Git",
        "Docker",
        "UiPath",
      ],
      "Machine Learning & AI": [
        "TensorFlow",
        "scikit-learn",
        "Pandas",
        "NumPy",
        "Transfer learning",
        "",
      ],
      "Cloud & Infrastructure": [
        "AWS",
        "GCP",
        "Azure",
        "Firebase",
        "IBM Cloud",
        "RabbitMQ",
        "Redis",
      ],
      "Security & Blockchain": [
        "RSA cryptography",
        "blockchain dev (Stellar, Hyperledger)",
        "Linux command line",
      ],
      Databases: [
        "PostgreSQL",
        "MongoDB",
        "MSSQL",
        "ER modeling & query optimization",
      ],
    },
    Languages: {
      English: "Upper-Intermediate (CEFR B2)",
      Korean: "Elementary (TOPIK: level 1; Sejong: 2A)",
      Thai: "Native",
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
  //   references: [
  //     {
  //       Title: "Asst. Prof. Dr.",
  //       Name: "Charnyote",
  //       Surname: "Pluempitiwiriyawej",
  //       Position: "ASSISTANT PROFESSOR",
  //       "Workplace Address": `Faculty of ICT, Mahidol University
  // 999 Phuttamonthon 4 Road, Salaya , Nakhon Pathom 73170 THAILAND`,
  //       "Contact Number": "+66 2 441 0909",
  //       "Email (Official)":
  //         "charnyote.plu@mahidol.ac.th; charnyote.plu@mahidol.edu",
  //     },

  //     {
  //       Title: "Dr.",
  //       Name: "Woraluck",
  //       Surname: "Wongse-ek",
  //       Position: "INSTRUCTOR",
  //       "Workplace Address": `Faculty of ICT, Mahidol University
  // 999 Phuttamonthon 4 Road, Salaya , Nakhon Pathom 73170 THAILAND`,
  //       "Contact Number": "+66 2 441 0909",
  //       "Email (Official)":
  //         "woraluck.won@mahidol.ac.th; woraluck.won@mahidol.edu",
  //     },
  //   ],
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
