import { Link } from "@mui/material";
import { GrReactjs } from "react-icons/gr";
import {
  SiTypescript,
  SiBootstrap,
  SiChakraui,
  SiRedux,
  SiTailwindcss,
  SiMaterialui,
  SiRubyonrails,
  SiPython,
  SiNodedotjs,
} from "react-icons/si";

import { Span } from "@components/bubbleProfile/bubbleProfile.style";
import {
  Section,
  ContentSection,
  Content,
  Header,
  TechList,
  Tech,
} from "./aboutMe.style";

export const AboutMe = () => {
  return (
    <Section id="about-me">
      <ContentSection>
        <Header>
          About <Span>Me</Span>
        </Header>
        <Content>
          Hello, again. My name is Napatchol basely in Thailand. I currently am
          a front-end developer at&nbsp;
          <Link
            href="https://datawow.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Data Wow
          </Link>
          , working on React, Redux, Rails, and Next.js.
        </Content>
        <Content>
          My passion for technology, data, and UX/XI design drives my life.
        </Content>
        <Content>
          Here are a few technologies I&#8217;ve been working with recently:
        </Content>
        <TechList>
          <Tech
            icon={<GrReactjs color="#62caf0" />}
            label="Reactjs"
            variant="outlined"
            sx={{
              borderColor: "#62caf0",
              color: "#62caf0",
            }}
          />
          <Tech
            icon={<SiTypescript color="#3a63b8" />}
            label="TypeScript"
            variant="outlined"
            sx={{
              borderColor: "#3a63b8",
              color: "#3a63b8",
            }}
          />
          <Tech
            icon={<SiRedux color="#6c34ad" />}
            label="Redux"
            variant="outlined"
            sx={{
              borderColor: "#6c34ad",
              color: "#6c34ad",
            }}
          />
          <Tech
            icon={<SiBootstrap color="#6e00eb" />}
            label="Bootstrap"
            variant="outlined"
            sx={{
              borderColor: "#6e00eb",
              color: "#6e00eb",
            }}
          />
          <Tech
            icon={<SiChakraui color="#65c2c7" />}
            label="Chakra UI"
            variant="outlined"
            sx={{
              borderColor: "#65c2c7",
              color: "#65c2c7",
            }}
          />
          <Tech
            icon={<SiTailwindcss color="#49aff6" />}
            label="Tailwindcss"
            variant="outlined"
            sx={{
              borderColor: "#49aff6",
              color: "#49aff6",
            }}
          />
          <Tech
            icon={<SiMaterialui color="#3966fe" />}
            label="Material UI"
            variant="outlined"
            sx={{
              borderColor: "#3966fe",
              color: "#3966fe",
            }}
          />
          <Tech
            icon={<SiRubyonrails color="#ba150f" />}
            label="Rails"
            variant="outlined"
            sx={{
              borderColor: "#ba150f",
              color: "#ba150f",
            }}
          />
          <Tech
            icon={<SiPython color="#efc93a" />}
            label="Python"
            variant="outlined"
            sx={{
              borderColor: "#efc93a",
              color: "#efc93a",
            }}
          />
          <Tech
            icon={<SiNodedotjs color="#4e8e49" />}
            label="Nodejs"
            variant="outlined"
            sx={{
              borderColor: "#4e8e49",
              color: "#4e8e49",
            }}
          />
        </TechList>
      </ContentSection>
    </Section>
  );
};
