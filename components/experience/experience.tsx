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
import { Grid, Link, Stack } from "@mui/material";
import { experience } from "@res/data";

export const Experience = () => (
  <ExperienceSection>
    <ExperienceHead>
      And This is <b>&lt;Napatchol Thaipanich&gt;</b>'s experience....
    </ExperienceHead>

    {Object.entries(experience).map(([key, value]) => (
      <Section container spacing={2} key={key}>
        <Grid item md={2} sm={12}>
          <SectionHead>{key}</SectionHead>
        </Grid>
        <Grid item md={10} sm={12}>
          {value.map((val, key) => (
            <Section container spacing={2} key={key}>
              <Grid item md={2} sm={12}>
                <TopicLogo
                  src={val?.image}
                  alt={val?.name ?? val?.title}
                  loading="lazy"
                />
              </Grid>
              <Grid item md={3} sm={3}>
                {val?.date && <TopicHead>{val?.date}</TopicHead>}
                {val?.issuedDate && <TopicHead>{val?.issuedDate}</TopicHead>}
              </Grid>
              <Grid item md={7} sm={9}>
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
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Technologies>
                    </>
                  )}
                  <Link href={val?.link} underline="hover">
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
);
