import { Data, University, Award, Work, Activity } from "./profile.d";

export const data: Data = {
  name: "Napatchol Thaipanich",
  nickname: "Pat",
  position: "Software Developer",
  subtitle: `I am deeply passionate about technology and data. I desire to learn new things and share my passion through code. My motto is "If anyone can do it, I can do it." My grandfather passed down this lesson to my mother and me, and the lesson has stayed with me ever since. I make it a point to work daily to improve my coding skills.
  <br/>
  <br/>
  I am looking for an exciting project. <b>"Let's build something remarkable together!"</b>`,
  address:
    "432/38 Chapter One Midtown Condo Ladprao 24, Ladprao Road, Chomphon, Chatuchak, Bangkok, Thailand 10900",
  contact: {
    Tel: "(+66)0959390164",
    Email: {
      name: "napatchol.tha@gmail.com",
      opt: {
        link: "mailto:napatchol.tha@gmail.com?subject=%5Bpatorsiang%2Egithub%2Eio%5D contact by seeing the info from the CV&body=Name%3D%3CInsert Your Name%3E%0D%0ATel%3D%3CInsert Your Tel%3E%0D%0ADetail%3A%0D%0A",
        underline: true,
        color: 0x569cd6,
      },
    },
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
        date: "2015 - 2023",
        school: "Faculty of Law",
        university: "Ramkhamhaeng University",
        degree: "Bachelor of Laws (LL.B.)",
        // gpa: "2.8",
        favoriteSubjects: [
          // "KOR1001 - KOR2002 Fundamental Korean",
          // "LAW3003 Civil and Commercial Law: Family",
          // "LAW3009 Civil and Commercial Law: Succession",
          // "LAW4009 Law on Intellectual Property 1",
          // "LAW4010 International Trade Law",
          // "LAW4053 Law Related to Computer",
          "Fundamental Korean",
          "Civil and Commercial Law: Family",
          "Civil and Commercial Law: Succession",
          "Law on Intellectual Property 1",
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
        degree: "Bachelor of Science (B.Sc.)",
        major: "Database and Intelligent Systems (DB)",
        gpa: "3.18",
        favoriteSubjects: [
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
        date: "04/2023 - Current",
        title: "Frontend Developer",
        type: "Freelance",
        location: "Bangkok, Thailand",
        description: [
          "Collected requirements from a client.",
          "Helped a client to get a solution.",
          "Separated tasks and estimated time for each task.",
          "Coded, Packed, Hosted, and Maintained a website.",
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
          "PDPA (Such as Cookie wow, PDPA Pro, PDPA Prokit, and PDPA Learn) Develop websites related to PDPA (Personal Data Protection Act)",
          "Etc. (Develop a website for Data Wow Co., Ltd. and external customers, such as dashboards, reports, chat storage (line chatbot), online mock exam platforms, etc.)",
        ],
      },
      {
        date: "11/2019 - 11/2021",
        title: "System Analyst",
        type: "Full-time",
        company: "Bank of Thailand",
        location: "Bangkok, Thailand",
        description: [
          "DLTBond: We use Blockchain (Hyperledger Fabric) to give every person a chance to purchase government bonds by not giving the bank the quota to the selling agent. I design, develop, regulate, and supervise the system with the team.",
          "ISO20022: The new standard for payment messaging, which will apply to the central core of the payment system in November 2025, includes Thailand, which also has to be shifted. So, I am involved in getting BA's requirement to Analyze and Develop the plan with the team and Test the flow with the team.",
          "RPA: RPA stands for Robotic process automation. Bank of Thailand also applies RPA to reduce the time spent on routine tasks and has time to use in the value task. I am involved in analyzing, adjusting, and improving the process and developing the flow by UiPath as an RPA developer.",
        ],
      },
      {
        date: "06/2019 - 08/2019",
        title: "Blockchain Developer, KBTG Develop Bootcamp 2019",
        type: "Internship",
        company: "Kasikorn Business Technology Group (KBTG)",
        location: "Bangkok, Thailand",
        description: [
          "Time D(onation): It is about the use case of blockchain to solve the social problem. This project uses the Stellar blockchain to create a Time D token on the platform to exchange volunteer service and keep track of volunteer service to give a reward. I brainstormed the idea and designed and developed the prototype with the team.",
        ],
      },
      {
        date: "06/2018 - 07/2018",
        title: "Frontend Developer",
        type: "Internship",
        company: "BeID Corporation Co., Ltd.",
        location: "Bangkok, Thailand",
        description: [
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
        name: "Selected to participate in the competition, Line Hack 2023, 1 of the final 8 teams in the general public",
      },
      {
        date: "2021",
        name: 'Selected to participate in the competition, "13th Find the best telecommunications and ICT skills in honor of His Majesty", 1 of the final 30 teams in the general public',
      },
      {
        date: "2018",
        name: 'Participated in the "Group Corporate Website Design Contest Activity" by Samut Sakhon Phatthana Mueang (Social Enterprise) x MUICT',
      },
    ],
  },
  etc: {
    "Computer Skills": {
      Language:
        "Javascript, Python, HTML, Java, PHP, TypeScript, Go (Programming Language), CSS, Tailwind CSS, SQL",
      Framework:
        "React.js, Vue.js, Angular.js, TypeScript, Next.js, Node.js, Express.js, UiPath",
      Hosting:
        "AWS Amplify, IBM Cloud, Firebase, GCP (Google Cloud Platform), Microsoft Azure",
      Blockchain: "IBM Hyperledger Fabric, Stellar Blockchain",
      Database:
        "Redis, MongoDB, PostgreSQL, MSSQL, ER Diagram, Database Design",
      "Queue Management": "RabbitMQ",
    },
    Languages: {
      English: "IELTS: band 6; Listening: 6 Reading 5 Writing 6 Speaking 6", // "IELTS: band 6",
      Korean: "TOPIK: level 1",
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
  frontEnd: {
    topic: {
      description: "Description",
      favoriteSubject: "Favorite Subject",
      major: "Major",
      gpa: "GPA",
    },
  },
};

export type { Data, University, Award, Work, Activity };
