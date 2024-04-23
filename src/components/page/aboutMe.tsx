import { getTranslations } from "next-intl/server";

import { get } from "lodash";

import { Info } from "@/data/profile.d";

export default async function AboutMe() {
  const t = await getTranslations("page.aboutMe");
  const t_info = await getTranslations("detail");

  return (
    <main className="self-container">
      <h1 className="about-h1">{t("title")}</h1>
      <hr className="about-hr" />
      {/* Experience information */}
      <section className="about-section">
        {/* Topic and detail for all screen */}

        {Object.entries(t_info.raw("info")).map(([topic, detail]) => {
          return (
            <div key={topic}>
              {/* Topic for smaller than large monitor */}
              <h2 className="about-section-header">{topic}</h2>
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
                    className="timeline-subheader timeline_item grid"
                  >
                    {/* Education: degree - school || Work or Activity : title or name */}
                    <h4 className="timeline-header">
                      {get(infoItem, "degree")
                        ? `${get(infoItem, "degree")} - ${get(
                            infoItem,
                            "school"
                          )}`
                        : get(infoItem, "title") ?? get(infoItem, "name")}
                    </h4>

                    {/* Education: university */}
                    <h5>{get(infoItem, "university")}</h5>

                    {/* Work: type • company • date */}
                    <h5 className="timeline-subheader--color">
                      {get(infoItem, "type") && (
                        <>{get(infoItem, "type")} &#8226; </>
                      )}
                      {get(infoItem, "company") && (
                        <>{get(infoItem, "company")} &#8226; </>
                      )}
                      {get(infoItem, "date")}
                    </h5>

                    {/* Work: location */}
                    <h5>{get(infoItem, "location")}</h5>

                    {/* Education: Major and GPA */}
                    <div className="about-section-education-details">
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
                    <ul className="about-section-description">
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
