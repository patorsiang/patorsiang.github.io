import dayjs from "dayjs";
import { Grid, Link, Stack } from "@mui/material";
import { NextSeo } from "next-seo";

import { experience } from "@res/data";

import { logEvent } from "@utility/ga";

import DEFAULT_SEO from "@utility/next-seo.config";

import {
  ExperienceSection,
  ExperienceHead,
  Section,
  SectionHead,
  TopicLogo,
  TopicHead,
  TopicDetail,
  TopicDescription,
  UnorderedList,
  TopicDetailHighlight,
  Technologies,
  Technology,
} from "./experience.style";

export const Experience = () => {
  const { title, ...rest } = DEFAULT_SEO;
  return (
    <>
      <NextSeo title="Experience" titleTemplate={`${title} | %s`} {...rest} />
      <ExperienceSection>
        <ExperienceHead>
          And This is <b>&lt;Napatchol Thaipanich&gt;</b>&apos;s experience....
        </ExperienceHead>

        {Object.entries(experience).map(([key, value]) => (
          <Section container spacing={2} key={key}>
            <Grid item md={2} sm={12} xs={12}>
              <SectionHead>{key}</SectionHead>
            </Grid>
            <Grid item md={10} sm={12} xs={12}>
              {value.map((val, key) => (
                <Section container spacing={2} key={key}>
                  <Grid item md={2} sm={12} xs={12}>
                    <TopicLogo
                      src={val?.image}
                      alt={val?.name ?? val?.title}
                      loading="lazy"
                    />
                  </Grid>
                  <Grid item md={3} sm={3} xs={12}>
                    {val?.start && (
                      <TopicHead>
                        {dayjs(val?.start).format("MMM YYYY ")} -
                        {val?.end
                          ? dayjs(val?.end).format(" MMM YYYY ")
                          : " Present "}
                      </TopicHead>
                    )}
                    {val?.issuedDate && (
                      <TopicHead>
                        {dayjs(val?.issuedDate).format("MMM YYYY")}
                      </TopicHead>
                    )}
                  </Grid>
                  <Grid item md={7} sm={9} xs={12}>
                    <Stack spacing={2}>
                      {val?.title && <TopicHead>{val?.title}</TopicHead>}
                      {val?.school && <TopicHead>{val?.school}</TopicHead>}
                      {val?.company && (
                        <TopicDetail>
                          {val?.company} {val?.type && <>&#183; {val?.type}</>}
                        </TopicDetail>
                      )}
                      {val?.description && (
                        <TopicDescription>{val?.description}</TopicDescription>
                      )}
                      {val?.degree && <TopicDetail>{val?.degree}</TopicDetail>}
                      {val?.major && (
                        <TopicDetail>
                          <b>Major:</b>
                          {` ${val?.major}`}
                        </TopicDetail>
                      )}
                      {val?.gpa && (
                        <TopicDetail>
                          <b>GPA:</b>
                          {` ${val?.gpa}`}
                        </TopicDetail>
                      )}
                      {val?.issuer && (
                        <TopicDetail>
                          <b>issuer:</b>
                          {` ${val?.issuer}`}
                        </TopicDetail>
                      )}
                      {val?.place && (
                        <TopicDetail>
                          <b>place:</b>
                          {` ${val?.place}`}
                        </TopicDetail>
                      )}
                      {val?.projects && (
                        <>
                          <TopicDetailHighlight>Projects</TopicDetailHighlight>
                          <UnorderedList>
                            {val?.projects.map((project, index) => (
                              <li key={index}>{project}</li>
                            ))}
                          </UnorderedList>
                        </>
                      )}
                      {val?.favoriteSubjects && (
                        <>
                          <TopicDetailHighlight>
                            Favorite Subjects
                          </TopicDetailHighlight>
                          <UnorderedList>
                            {val?.favoriteSubjects.map((subject, index) => (
                              <li key={index}>{subject}</li>
                            ))}
                          </UnorderedList>
                        </>
                      )}
                      {val?.technologies && (
                        <>
                          <TopicDetailHighlight>
                            Technologies Stack (I have used)
                          </TopicDetailHighlight>
                          <Technologies>
                            {val?.technologies.map((tech, index) => (
                              <Technology
                                key={index}
                                label={tech}
                                color="info"
                                variant="outlined"
                              />
                            ))}
                          </Technologies>
                        </>
                      )}
                      <Link
                        href={val?.link}
                        target="_blank"
                        underline="hover"
                        color="info"
                        onClick={() => {
                          logEvent({
                            event: `experience-click-${
                              val?.school ?? val?.company ?? val?.title
                            }`,
                          });
                        }}
                      >
                        Link
                      </Link>
                    </Stack>
                  </Grid>
                </Section>
              ))}
            </Grid>
          </Section>
        ))}
      </ExperienceSection>
    </>
  );
};
