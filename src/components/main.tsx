import Image from "next/image";

import { HiOutlineMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoDownload } from "react-icons/io5";

import { TextAnimation } from "./animation";
import { IconLink } from "./iconLink";

import { getDictionary } from "@/utils/getDictionaries";

const iconSize = "2.5em";

// Contact Icons
const contactIcons = {
  Email: HiOutlineMail,
  LinkedIn: FaLinkedin,
  Github: FaGithub,
};

export default async function Main({ lang }: { lang?: string }) {
  const info = await getDictionary(lang ?? "en");

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8">
      {/* Avatar */}
      {/* https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Default&eyebrowType=Default&mouthType=Eating&skinColor=Light */}
      <Image
        src="/imgs/avataaars.svg"
        alt="My Avatar"
        className={"h-auto w-2/4 max-sm:w-3/4 md:w-1/4"}
        width={100}
        height={100}
        priority
      />

      {/* Name */}
      <h1 className="flex flex-wrap gap-4 gap-y-2 font-bold justify-center text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
        <TextAnimation text={`${info.name} (${info.nickname})`} />
      </h1>

      {/* Subtitle */}
      <h2
        className="text-center text-sx md:text-xl"
        dangerouslySetInnerHTML={{ __html: info.subtitle }}
      />

      {/* Contact */}
      <div className="flex items-center justify-between gap-10">
        {Object.entries(contactIcons).map(([key, Icon]) => (
          <IconLink key={key} link={info.contact[key].opt.link} label={key}>
            <Icon size={iconSize} />
          </IconLink>
        ))}
        <IconLink key="CV" link="/api/cv" label="CV">
          <IoDownload size={iconSize} />
        </IconLink>
      </div>

      <h1 className="text-2x1 font-bold text-center">
        It is in the process to update the website
      </h1>
    </main>
  );
}
