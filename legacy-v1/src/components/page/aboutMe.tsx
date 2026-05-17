import { getTranslations } from "next-intl/server";

import { get } from "lodash";

import { Education, WorkExperience } from "@/data/types/profile";

export default async function AboutMe() {
  const t = await getTranslations("page.aboutMe");
  const t_info = await getTranslations("detail");
  const history = await t_info.raw("history");

  return (
    <main className="self-container">
      <h1 className="about-h1">{t("title")}</h1>
      <hr className="about-hr" />
      {/* Experience information */}
      <section className="about-section">
        {/* Topic and detail for all screen */}
        {Object.entries(history).map(([key, val]) => {
          return (
            <div key={key}>
              {/* Topic for smaller than large monitor */}
              <h2 className="about-section-header">{key}</h2>
              {/* Started Detail Section */}

              {Array.isArray(val) ? (
                val.every((v) => typeof v === "string") ? (
                  <p className="about-section-subtopic">{val.join(", ")}</p>
                ) : (
                  <ul>
                    {val.map((v) => {
                      const {
                        degree,
                        school,
                        university,
                        location,
                        date,
                        major,
                        GPA,
                        modules,
                        project,
                      } = v as Education;

                      const { title, type, desc, company } =
                        v as WorkExperience;
                      return (
                        <li
                          key={
                            degree
                              ? `${degree} - ${school}${
                                  university ? `, ${university}` : ""
                                }`
                              : title
                          }
                          className="timeline-subheader timeline_item grid"
                        >
                          {/* Work: type • company • date */}
                          <h5 className="timeline-subheader--color">
                            {type && <>{type} &#8226; </>}
                            {company && <>{company} &#8226; </>}
                            {date}
                          </h5>

                          {/* Education: degree - school || Work or Activity : title */}
                          <h4 className="timeline-header">
                            {degree
                              ? `${degree} - ${school}${
                                  university ? `, ${university}` : ""
                                }`
                              : title}
                          </h4>

                          {/* Work: location */}
                          <h5>{location}</h5>

                          {/* Education: Major and GPA */}
                          <div className="about-section-education-details">
                            {major && (
                              <>
                                <h6>{t("major")}: </h6>
                                <p>{major}</p>
                              </>
                            )}
                            {GPA && (
                              <>
                                <h6>{t("gpa")}: </h6>
                                <p>{GPA}</p>
                              </>
                            )}
                          </div>

                          <ul className="about-section-description">
                            {/* Education: Focus */}
                            {modules && (
                              <>
                                <h6 className="font-bold">
                                  {t("favoriteSubject")}:{" "}
                                </h6>
                                {modules?.map((subject) => (
                                  <li key={subject}>{subject}</li>
                                ))}
                              </>
                            )}

                            {/* Description */}
                            {desc && (
                              <>
                                <h6 className="font-bold">
                                  {t("description")}:{" "}
                                </h6>
                                {desc?.map((desc) => (
                                  <li key={desc}>{desc}</li>
                                ))}
                              </>
                            )}
                            {/* Projects */}
                            {project && (
                              <>
                                <h6 className="font-bold">{t("projects")}: </h6>
                                {project?.map((project) => (
                                  <li key={project?.title}>
                                    <b>
                                      {project?.title} ({project?.tag})
                                    </b>
                                    {project?.url && (
                                      <a
                                        href={project?.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="about-section-project-link justify-around"
                                      >
                                        &lt;{t("seeProject")}&gt;
                                      </a>
                                    )}

                                    <p className="about-section-subtopic">
                                      <b>{t("description")}: </b>
                                      {project?.desc}
                                    </p>
                                    {project?.skill?.length > 0 && (
                                      <p className="about-section-subtopic">
                                        <b>{t("skills")}: </b>
                                        {project?.skill?.join(", ")}
                                      </p>
                                    )}
                                  </li>
                                ))}
                              </>
                            )}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                )
              ) : typeof val === "object" && val !== null ? (
                Object.entries(val).map(([k, v]) => {
                  if (Array.isArray(v)) {
                    const isStringList = v.every(
                      (item) => typeof item === "string"
                    );

                    if (!isStringList) {
                      return (
                        <ul key={k} className="about-section-ul">
                          <p className="about-section-subtopic">
                            <b>{k}: </b>
                          </p>
                          {v.map((item) => (
                            <li key={item.title} className="about-section-li">
                              {item.title}
                            </li>
                          ))}
                        </ul>
                      );
                    } else {
                      return (
                        <p className="about-section-subtopic" key={k}>
                          <b>{k}: </b> {v.join(", ")}
                        </p>
                      );
                    }
                  } else {
                    return (
                      <p className="about-section-subtopic" key={k}>
                        <b>{k}: </b> {v}
                      </p>
                    );
                  }
                })
              ) : (
                ""
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}
