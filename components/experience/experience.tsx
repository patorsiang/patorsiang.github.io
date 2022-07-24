import {
  ExperienceSection,
  ExperienceHead,
  SectionHead,
  TopicLogo,
} from "./experience.style";
import { Grid } from "@mui/material";
import { experience } from "@res/data";

export const Experience = () => (
  <ExperienceSection>
    <ExperienceHead>
      And This is <b>&lt;Napatchol Thaipanich&gt;</b>'s experience....
    </ExperienceHead>

    {Object.entries(experience).map(([key, value]) => (
      <Grid container spacing={2} key={key}>
        <Grid item md={2} sm={12}>
          <SectionHead>{key}</SectionHead>
        </Grid>
        <Grid item md={10} sm={12}>
          {value.map((val, key) => (
            <Grid container spacing={2} key={key}>
              <Grid item md={2} sm={12}>
                <TopicLogo
                  src={val?.image}
                  alt={val?.name ?? val?.title}
                  loading="lazy"
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    ))}
  </ExperienceSection>
);
