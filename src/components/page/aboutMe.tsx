import { getTranslations } from "next-intl/server";

import { get } from "lodash";

import { Info } from "@/data/profile.d";

export default async function AboutMe() {
  const t = await getTranslations("Index.topic");

  const t_info = await getTranslations("");

  return (
    <main className="self-container">
      <hr className="max-w-[150px] w-full border-2 lg:border-4" />

      {/* Experience information */}
      <section className="flex flex-col gap-4">
        {/* Topic and detail for all screen */}

        {Object.entries(t_info.raw("info")).map(([topic, detail]) => {
          return (
            <div key={topic} className="flex flex-col gap-4">
              {/* Topic for smaller than large monitor */}
              <h3 className="leading-loose underline underline-offset-8 decoration-[3px] font-bold text-md sm:text-lg md:text-xl lg:text-2xl p-6">
                {topic}
              </h3>
              {/* Started Detail Section */}
              <ul>
                {(detail as Array<Info>).map((infoItem) => (
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

                    {/* Education: favorite subject */}
                    <ul className="list-disc list-inside">
                      {get(infoItem, "favoriteSubjects") && (
                        <>
                          <h6 className="font-bold">
                            {t("favoriteSubject")}:{" "}
                          </h6>
                          {infoItem?.favoriteSubjects?.map((subject) => (
                            <li key={subject}>{subject}</li>
                          ))}
                        </>
                      )}
                      {get(infoItem, "description") && (
                        <>
                          <h6 className="font-bold">{t("description")}: </h6>
                          {infoItem?.description?.map((subject) => (
                            <li key={subject}>{subject}</li>
                          ))}
                        </>
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
    </main>
  );
}
