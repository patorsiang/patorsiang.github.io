import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Twitter,
  // YouTube,
  GitHub,
  // SmartToyOutlined,
  HomeRounded,
  InfoRounded,
  WorkRounded,
  FileDownloadRounded,
} from "@mui/icons-material";

// cartoon: https://drive.google.com/uc?export=view&id=1Po3wbjeWYA2qaWdVPfX2Ys4GMTCOqgX9

// export const profileImage =
//   "https://drive.google.com/uc?export=view&id=110DgocC9RMnx0y6occuLwMrIAGxFwg9C";

export const profileImage = "/bubbleProfile";

export const Social = [
  {
    icon: FacebookOutlined,
    name: "Facebook",
    url: "https://www.facebook.com/napatchol.thaipanich",
    target: "_blank",
  },
  {
    icon: Instagram,
    name: "Instagram",
    url: "https://www.instagram.com/patorseing/",
    target: "_blank",
  },
  {
    icon: LinkedIn,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/napatchol-thaipanich/",
    target: "_blank",
  },
  {
    icon: Twitter,
    name: "Twitter",
    url: "https://twitter.com/SeingOrPat",
    target: "_blank",
  },
  // {
  //   icon: YouTube,
  //   name: "YouTube",
  //   url: "https://www.youtube.com/channel/UCaTBr-FOe6pggqCjy47zfcA",
  //   target: "_blank",
  // },
  {
    icon: GitHub,
    name: "GitHub",
    url: "https://github.com/patorseing",
    target: "_blank",
  },
  // {
  //   icon: SmartToyOutlined,
  //   name: "Line",
  //   url: "#",
  //   target: "",
  // },
];

export const email = "napatchol.tha@gmail.com";

export const actions = [
  { icon: <HomeRounded />, name: "Home", url: "/" },
  { icon: <InfoRounded />, name: "About", url: "/#about-me" },
  { icon: <WorkRounded />, name: "Experience", url: "/experience" },
  {
    icon: <FileDownloadRounded />,
    name: "Download_CV",
    externalURL:
      "https://drive.google.com/file/d/1-NB3iE8rxRxrTH5i_o6LOty5kdd0QKPs/view?usp=sharing",
    target: "_blank",
  },
];

export const experience: Record<
  string,
  Partial<{
    title: string;
    company: string;
    link: string;
    image: string;
    type: string;
    start: string;
    end: string;
    projects: string[];
    technologies: string[];
    description: string;
    school: string;
    titles: string;
    degree: string;
    favoriteSubjects: string[];
    major: string;
    gpa: number;
    issuer: string;
    issuedDate: string;
    place: string;
    name: string;
    standard: string;
    score: string;
  }>[]
> = {
  works: [
    {
      title: "Front-End Developer",
      company: "Data Wow Co., Ltd.",
      link: "https://datawow.io",
      image:
        "https://media-exp2.licdn.com/dms/image/C4D0BAQGjDgKU-t7sBw/company-logo_200_200/0/1656557065462?e=2147483647&v=beta&t=1lSorQ1plRBbs9MAeZWEFUaBT3pmi3m1bpd2bsBUul0",
      type: "Full-time",
      start: "12/01/2021",
      projects: [
        "Develop websites related to PDPA (Personal Data Protection Act)",
        "Develop a website for Data Wow Co., Ltd. and external customers, such as dashboards, reports, online mock exam platforms, etc.",
      ],
      technologies: [
        "GitHub",
        "ReactJS",
        "NextJS",
        "Typescript",
        "Rails",
        "ChartJS",
        "d3",
        "Chakra UI",
        "tailwindcss",
        "Bootstrap",
        "AWS",
        "GTM",
      ],
    },
    {
      title: "System Analyst",
      company: "Bank of Thailand",
      link: "https://www.bot.or.th",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8c/Seal_of_the_Bank_of_Thailand.png",
      type: "Full-time",
      start: "11/01/2019",
      end: "11/01/2021",
      projects: [
        "Design, Develop, Regulate and Supervise the DLTBond system with the team, including internal dashboard tool, API, and smart contract.",
        "Develop and quality control (test) some parts of ISO20022 payment standard to link with SWIFT",
        "Develop RPA (Robot Programming Assistant) for internals to automate the routine tasks.",
      ],
      technologies: [
        "GitLab",
        "Azure Repos",
        "AngularJS",
        "Typescript",
        "NodeJS",
        "Golang",
        "Java",
        "IIB",
        "PostgreSQL",
        "IBM Cloud",
        "Fabric Hyperledger",
        "UIPath",
      ],
    },
    {
      title: "Blockchain Developer",
      company: "KASIKORN Business-Technology Group [KBTG]",
      link: "https://www.kbtg.tech",
      image:
        "https://www.redhat.com/outfit/6885b9b2ef384bf80749c95ac6c3a9bf/KBTG%20case%20study_logo.PNG",
      type: "Internship (Developer Bootcamp)",
      start: "06/01/2019",
      end: "08/01/2019",
      description:
        "As the participants in Developer Bootcamp that year, my team had to brainstorm, design, and develop innovative blockchain solutions to solve social problems.",
      projects: [
        "Time D(onation): This project uses the Stellar blockchain to create a Time D token on the platform to exchange volunteer service and keep track of volunteer service to give a reward.",
      ],
      technologies: ["ReactJS", "Golang", "Stellar"],
    },
    {
      title: "Database Design Lab Assistant",
      company:
        "Mahidol University, Faculty of Information and Communication Technology (MUICT)",
      link: "https://www.ict.mahidol.ac.th",
      image: "https://student.ict.mahidol.ac.th/Content/site-logo-ict.png",
      type: "Part-time",
      start: "01/01/2019",
      end: "05/01/2019",
      description:
        "As a part-time assistant in the Database Design Lab, I was responsible for helping the professor explain the database's design and the development of the database to students in the class.",
      technologies: ["SQL", "ERD"],
    },
    {
      title: "Frontend Developer",
      company: "BeID Corporation Co., Ltd.",
      link: "https://www.beid.io",
      image:
        "https://media-exp1.licdn.com/dms/image/C510BAQFrdWzGwshSWA/company-logo_200_200/0/1575708137035?e=2147483647&v=beta&t=_iW52C9N3rAZo4dhxyPxZTX2cYPg7u61AuMkkSUj9kM",
      type: "Internship",
      start: "06/01/2018",
      end: "08/01/2018",
      technologies: ["ReactJS"],
    },
  ],
  educations: [
    {
      start: "07/01/2015",
      degree: "Bachelor of Laws (B.L), Law",
      school: "Ramkhamhaeng University",
      link: "https://www.ru.ac.th",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Emblem_of_Ramkhamhaeng_University%2C_BW.svg/1200px-Emblem_of_Ramkhamhaeng_University%2C_BW.svg.png",
      favoriteSubjects: [
        "LAW3003 Civil and Commercial Law: Family",
        "LAW3009 Civil and Commercial Law: Succession",
        "LAW4009 Law on Intellectual Property 1",
        "LAW4010 International Trade Law",
        "KOR1001 Fundamental Korean 1",
      ],
    },
    {
      start: "08/01/2015",
      end: "08/01/2019",
      degree: "Bachelor of Science in Information Technology (B.Sc. in IT)",
      school: "Mahidol University",
      image: "https://student.ict.mahidol.ac.th/Content/site-logo-ict.png",
      link: "https://www.mahidol.ac.th",
      major: "Database and Intelligent Systems (DB)",
      gpa: 3.18,
      favoriteSubjects: [
        "ITCS210 Web Programming",
        "ITCS393 Darabase Systems Lab",
        "ITCS413 Darabase Design",
        "ITCS476 Digital Image Processing",
      ],
    },
    {
      start: "05/01/2003",
      end: "05/01/2015",
      degree: "Primary School - High School",
      image: "https://www.kus.ku.ac.th/images_kus/kus_logo.png",
      school: "Kasetsart University Laboratory School",
      link: "https://www.kus.ku.ac.th",
      major: "Science and Mathematics",
      gpa: 2.85,
    },
  ],
  certificates: [
    {
      title: "MTA: Database Fundamentals - Certified 2019",
      issuer: "Microsoft",
      issuedDate: "01/01/2019",
      image:
        "https://images.credly.com/size/340x340/images/ea7a28fd-504c-4dec-a445-5aec449550a6/MTA-Database-Fundamentals-2019.png",
      link: "https://www.youracclaim.com/badges/07ec804b-2ac3-4c03-963d-6a77808fa2f9/linked_in_profile",
    },
  ],
  hackathons: [
    {
      title: "CJE Hackathon 2020 by Botnoi",
      image:
        "data:image/jpeg;base64,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",
      issuedDate: "01/02/2020",
      place: "Runner-up, winner, 3rd place",
      link: "https://www.instagram.com/p/B832TIspaGG/?utm_source=ig_web_copy_link",
    },
  ],
};
