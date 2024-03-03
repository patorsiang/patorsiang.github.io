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
  const t = await getTranslations("Index.topic");

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-12">
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
        <TextAnimation
          text={`${get(info, "name")} (${get(info, "nickname")})`}
        />
      </h1>

      {/* Subtitle */}
      <h2
        className="text-center text-sx md:text-xl"
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

      <hr className="max-w-[150px] w-full border-2 lg:border-4" />

      {/* Experience information */}
      <section className="flex flex-col gap-4">
        {/* Topic for Large Monitor */}
        <div className="hidden lg:grid lg:gap-6 lg:grid-cols-3">
          {Object.keys(get(info, "info")).map((topic) => (
            <h3
              key={topic}
              className="leading-loose underline underline-offset-8 decoration-[3px] font-bold text-md sm:text-lg md:text-xl lg:text-2xl"
            >
              {topic}
            </h3>
          ))}
        </div>
        {/* Topic and detail for all screen */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {Object.entries(get(info, "info")).map(([topic, detail]) => (
            <div key={topic} className="flex flex-col gap-4">
              {/* Topic for smaller than large monitor */}
              <h3 className="leading-loose underline underline-offset-8 decoration-[3px] font-bold text-md sm:text-lg md:text-xl lg:text-2xl lg:hidden">
                {topic}
              </h3>
              {/* Started Detail Section */}
              <ul>
                {detail.map((infoItem) => (
                  // timeline list
                  <li
                    key={`${get(infoItem, "date")}_${
                      get(infoItem, "degree") ??
                      get(infoItem, "title") ??
                      get(infoItem, "name")
                    }`}
                    className="timeline_item grid"
                  >
                    {/* Education: degree - school || Work or Activity : title or name */}
                    <h4 className="font-bold text-sm md:text-md lg:text-lg">
                      {get(infoItem, "degree")
                        ? `${get(infoItem, "degree")} - ${get(
                            infoItem,
                            "school"
                          )}`
                        : get(infoItem, "title") ?? get(infoItem, "name")}
                    </h4>

                    {/* Education: university */}
                    {get(infoItem, "university") && (
                      <h5>{get(infoItem, "university")}</h5>
                    )}

                    {/* Work: type • company • date */}
                    <h5 className="text-sx md:text-sm lg:text-md timeline-sub">
                      {get(infoItem, "type") && (
                        <>{get(infoItem, "type")} &#8226; </>
                      )}
                      {get(infoItem, "company") && (
                        <>{get(infoItem, "company")} &#8226; </>
                      )}
                      {get(infoItem, "date")}
                    </h5>

                    {/* Work: location */}
                    <h5 className="text-sx md:text-sm lg:text-md timeline-sub">
                      {get(infoItem, "location")}
                    </h5>

                    {/* Education: Major and GPA */}
                    <div className="flex flex-wrap gap-2">
                      {infoItem?.major && (
                        <>
                          <h6>{t("major")}: </h6>
                          <p>{get(infoItem, "major")}</p>
                        </>
                      )}
                      {get(infoItem, "gpa") && (
                        <>
                          <h6>{t("gpa")}: </h6>
                          <p>{get(infoItem, "gpa")}</p>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <h1 className="text-2x1 font-bold text-center">
        It is in the process to update the website
      </h1>
    </main>
  );
}
