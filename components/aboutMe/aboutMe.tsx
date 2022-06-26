import { Section, Content, Header } from "./aboutMe.style";
import { Span } from "@components/bubbleProfile/bubbleProfile.style";
export const AboutMe = () => {
  return (
    <Section id="about-me">
      <Content>
        <Header>
          About <Span>Me</Span>
        </Header>
        Before I studied in university, I thought I was below the standard. And,
        I never thought that I would not see success in anything. But I studied
        hard and harder in my passion for technology and data. My clicking point
        was when I applied to the Faculty of Information and Communication
        Technology, Mahidol University; My GPA was much better than high school.
        That made me know that this may be the right way to be my career and
        life. So now, I also keep improving and expanding to other sides too. 😉
      </Content>
    </Section>
  );
};
