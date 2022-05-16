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
  "https://drive.google.com/uc?export=view&id=1G2l03joYRitU_KjbZjxcDnw99w_BI03j";

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
  { icon: <InfoRounded />, name: "About", url: "/about" },
  { icon: <WorkRounded />, name: "Experience", url: "/experience" },
  { icon: <FileDownloadRounded />, name: "Download_CV", url: "" },
];
