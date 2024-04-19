import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { get } from "lodash";

import { TextAnimation } from "../animation";
import { IconLink } from "../iconLink";
import { DownloadCVLink } from "../downloadCV";

import { contactIcons, iconSize } from "@/constants";

import { getDictionary } from "@/utils/getDictionaries";

export default async function Main({ lang }: { lang?: string }) {
  const info = await getDictionary(lang ?? "en");
  const t = await getTranslations("Index");

  return (
    <main className="flex flex-col items-center justify-between gap-10 p-12 pt-0 md:p-24 lg:pt-0 sm:px-24 md:px-48 lg:px-64">
      {/* Avatar */}
      {/* https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Default&eyebrowType=Default&mouthType=Eating&skinColor=Light */}
      <Image
        src="/imgs/avataaars.svg"
        alt="My Avatar"
        className={"drop-shadow-2xl h-auto w-3/4 sm:w-2/4 lg:w-1/4"}
        width={100}
        height={100}
        priority
      />
      <div className="typewriter">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
          Hello World!
        </p>
      </div>
      {/* Name */}
      <section className=" flex flex-wrap gap-4 gap-y-2 font-bold justify-center text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
        <h1 className="flex flex-wrap gap-4 gap-y-2 justify-center">
          <TextAnimation
            text={t("introduction", {
              nickname: get(info, "nickname"),
              fullName: get(info, "name"),
            })}
            delay={0.01}
          />
        </h1>
        <h1 className="flex flex-wrap gap-4 gap-y-2">
          <TextAnimation text={get(info, "position")} />
        </h1>
      </section>
      {/* Contact */}
      <section className="w-full max-w-60 flex flex-wrap justify-evenly">
        {Object.entries(contactIcons).map(([key, Icon]) => (
          <IconLink
            key={key}
            href={get(info, `contact.${key}.opt.link`) ?? ""}
            label={key}
            target="_blank"
          >
            <Icon size={iconSize} />
          </IconLink>
        ))}
        <DownloadCVLink />
      </section>
      {/* Subtitle */}
      <h2
        className="text-sx md:text-base lg:text-lg text-justify"
        dangerouslySetInnerHTML={{ __html: get(info, "subtitle") }}
      />
    </main>
  );
}
