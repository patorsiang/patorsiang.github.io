import { Link } from "@mui/material";

import { Span } from "@components/bubbleProfile/bubbleProfile.style";

import { logEvent } from "@utility/ga";

import { Section, ContentSection, Content, Header } from "./aboutMe.style";

export const AboutMe = () => {
  return (
    <Section id="about-me">
      <ContentSection>
        <Header>
          About <Span>Me</Span>
        </Header>
        <Content>
          สวัสดีค่ะ Hi, my name is Napatchol (Na&#183;pat&#183;chol). So you can
          call me Pat. I&apos;m a software engineer. Currently, I work @
          <Link
            href="https://datawow.io/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mx: 1,
              fontWeight: "bold",
            }}
            onClick={() => {
              logEvent({
                event: `about-click-datawow`,
              });
            }}
          >
            Data Wow Co. Ltd
          </Link>
          as Front End Developer, working with React, Redux, Rails, and Next.js.
        </Content>
        <Content>
          I am passionate about technology and data. My hobbies are playing with
          code and learning new. My motto is &nbsp;
          <b>&quot;If anyone can do it, I can do it&quot;</b> &nbsp; that is how
          my grandpa taught my mom, and my mom taught me. Thus, I try more
          demanding daily to improve my skill in solving code, which I like, as
          anyone can do.
        </Content>
        <Content>
          I am open to working with new technologies and always looking for new
          challenges.
        </Content>
      </ContentSection>
    </Section>
  );
};
