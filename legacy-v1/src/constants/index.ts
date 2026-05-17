import { HiOutlineMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Ubuntu_Mono, Noto_Serif_Thai, Noto_Sans_KR } from "next/font/google";

// Contact Icons
export const contactIcons = {
  Email: HiOutlineMail,
  LinkedIn: FaLinkedin,
  Github: FaGithub,
};

export const iconSize = "2.5em";

export const fontEN = Ubuntu_Mono({
  weight: ["400", "700"],
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "greek-ext",
    "latin",
    "latin-ext",
  ],
});

export const fontTH = Noto_Serif_Thai({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
});

export const fontKR = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const scaleFactor = 3;
