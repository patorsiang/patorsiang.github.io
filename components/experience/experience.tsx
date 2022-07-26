import {
  ExperienceSection,
  ExperienceHead,
  Section,
  SectionHead,
  TopicLogo,
  TopicHead,
  TopicDetail,
} from "./experience.style";
import { Grid, Link } from "@mui/material";
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
                <TopicHead>{val?.title}</TopicHead>
                <TopicDetail>{val?.company}</TopicDetail>
                <Link href={val?.link} underline="hover">
                  Link
                </Link>
              </Grid>
            </Section>
          ))}
        </Grid>
      </Section>
    ))}
  </ExperienceSection>
);
