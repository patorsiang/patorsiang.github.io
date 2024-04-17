import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { get } from "lodash";

import { TextAnimation } from "./animation";
import { IconLink } from "./iconLink";
import { DownloadCVLink } from "./downloadCV";

import { contactIcons, iconSize } from "@/constants";

import { getDictionary } from "@/utils/getDictionaries";

import { Contact } from "@/data/profile.d";

export default async function Main({ lang }: { lang?: string }) {
  const info = await getDictionary(lang ?? "en");
  const t = await getTranslations("Index");

  return (
    // <main className="flex min-h-screen flex-col items-center gap-8 p-12">
    <main className="flex min-h-screen flex-col items-center justify-between gap-10 p-12 md:p-24 sm:px-48 md:px-48">
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
      <section className="flex flex-wrap gap-4 gap-y-2 font-bold justify-center text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
        <h1 className="flex flex-wrap gap-4 gap-y-2 font-bold justify-center text-center">
          <TextAnimation
            text={t("introduction", {
              nickname: get(info, "nickname"),
              fullName: get(info, "name"),
            })}
            delay={0.01}
          />
        </h1>
        <h1 className="flex flex-wrap gap-4 gap-y-2 font-bold justify-center text-center">
          <TextAnimation text={get(info, "position")} />
        </h1>
      </section>

      {/* Subtitle */}
      <h2
        className="text-sx md:text-xl text-justify"
        dangerouslySetInnerHTML={{ __html: get(info, "subtitle") }}
      />

      {/* Contact */}
      <section className="flex flex-wrap items-center gap-10 justify-center">
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
    </main>
  );
}
