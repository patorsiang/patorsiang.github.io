import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
  GitHub,
  SmartToyOutlined,
  HomeRounded,
  InfoRounded,
  WorkRounded,
  FileDownloadRounded,
} from "@mui/icons-material";

// cartoon: https://drive.google.com/uc?export=view&id=1Po3wbjeWYA2qaWdVPfX2Ys4GMTCOqgX9

export const profileImage =
  "https://drive.google.com/uc?export=view&id=110DgocC9RMnx0y6occuLwMrIAGxFwg9C";

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
  {
    icon: YouTube,
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCaTBr-FOe6pggqCjy47zfcA",
    target: "_blank",
  },
  {
    icon: GitHub,
    name: "GitHub",
    url: "https://github.com/patorseing",
    target: "_blank",
  },
  {
    icon: SmartToyOutlined,
    name: "Line",
    url: "#",
    target: "",
  },
];

export const email = "napatchol.tha@gmail.com";

export const actions = [
  { icon: <HomeRounded />, name: "Home", url: "/" },
  { icon: <InfoRounded />, name: "About", url: "/#about-me" },
  { icon: <WorkRounded />, name: "Experience", url: "/experience" },
  { icon: <FileDownloadRounded />, name: "Download_CV", url: "" },
];

export const experience = {
  work: [
    {
      title: "Front-End Developer",
      company: "Data Wow Co., Ltd.",
      link: "https://datawow.io",
      image:
        "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/czygjyzixcantehjf6nh",
      type: "Full-time",
      date: "Dec 2021 - PRESENT",
      projects: [
        "Develop websites related to PDPA (Personal Data Protection Act)",
        "Develop website for Data Wow Co., Ltd. and external customer such as: dashboards, reports, test platform, etc.",
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
      date: "Nov 2019 - Nov 2021",
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
        "java",
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
      date: "Nov 2019 - Nov 2021",
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
      date: "Jan 2019 - May 2019",
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
      date: "Jun 2018 - Aug 2018",
      technologies: ["ReactJS"],
    },
  ],
  education: [],
  certificates: [],
};
