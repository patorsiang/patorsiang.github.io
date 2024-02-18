import Image from "next/image";
import Link from "next/link";

import { HiOutlineMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
      <h1 className="font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
        {info.name} ({info.nickname})
      </h1>

      {/* Contact */}
      <div className="flex items-center justify-between gap-10">
        {Object.entries(contactIcons).map(([key, Icon]) => (
          <Link
            key={key}
            href={info.contact[key].opt.link}
            target="_blank"
            className="cursor-pointer lnk"
            aria-label={`Click ${key}`}
          >
            <Icon size={iconSize} />
          </Link>
        ))}
      </div>

      {/* Subtitle */}
      <h2
        className="text-center text-sx md:text-xl"
        dangerouslySetInnerHTML={{ __html: info.subtitle }}
      />

      <h1 className="text-2x1 font-bold text-center">
        It is in the process to update the website
      </h1>
    </main>
  );
}
