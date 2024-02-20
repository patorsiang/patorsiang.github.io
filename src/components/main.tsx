import Image from "next/image";
import { getTranslations } from "next-intl/server";

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
        <TextAnimation text={`${info.name} (${info.nickname})`} />
      </h1>

      {/* Subtitle */}
      <h2
        className="text-center text-sx md:text-xl"
        dangerouslySetInnerHTML={{ __html: info.subtitle }}
      />

      {/* Contact */}
      <section className="flex flex-wrap items-center gap-10 justify-center">
        {Object.entries(contactIcons).map(([key, Icon]) => (
          <IconLink
            key={key}
            href={
              typeof info.contact[key] === "object"
                ? (info.contact[key] as Contact)?.opt?.link
                : ""
            }
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
          {Object.keys(info.info).map((topic) => (
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
          {Object.entries(info.info).map(([topic, detail]) => (
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
                    key={`${infoItem.date}_${
                      infoItem?.degree ?? infoItem?.title ?? infoItem?.name
                    }`}
                    className="timeline_item grid"
                  >
                    {/* Education: degree - school || Work or Activity : title or name */}
                    <h4 className="font-bold text-sm md:text-md lg:text-lg">
                      {infoItem?.degree
                        ? `${infoItem?.degree} - ${infoItem?.school}`
                        : infoItem?.title ?? infoItem?.name}
                    </h4>

                    {/* Education: university */}
                    {infoItem?.university && <h5>{infoItem?.university}</h5>}

                    {/* Work: type • company • date */}
                    <h5 className="text-sx md:text-sm lg:text-md timeline-sub">
                      {infoItem?.type && <>{infoItem?.type} &#8226; </>}
                      {infoItem?.company && <>{infoItem?.company} &#8226; </>}
                      {infoItem.date}
                    </h5>

                    {/* Work: location */}
                    <h5 className="text-sx md:text-sm lg:text-md timeline-sub">
                      {infoItem?.location}
                    </h5>

                    {/* Description */}
                    {infoItem?.description && (
                      <>
                        <h6>{t("description")}</h6>
                        <ul className="list-disc list-inside">
                          {infoItem?.description.map((desc, idx) => (
                            <li key={`desc-${idx}`}>{desc}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Education: Favorite Subjects */}
                    {infoItem?.favoriteSubjects && (
                      <>
                        <h6>{t("favoriteSubject")}</h6>
                        <ul className="list-disc list-inside">
                          {infoItem?.favoriteSubjects?.map((subject) => (
                            <li key={subject}>{subject}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Education: Major and GPA */}
                    <div className="flex flex-wrap gap-2">
                      {infoItem?.major && (
                        <>
                          <h6>{t("gpa")}</h6>
                          <p>{infoItem?.major}</p>
                        </>
                      )}
                      {infoItem?.gpa && (
                        <>
                          <h6>
                            {
                              (
                                info?.frontEnd?.topic as {
                                  gpa?: string;
                                }
                              )?.gpa
                            }
                            :{" "}
                          </h6>
                          <p>{infoItem?.gpa}</p>
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
