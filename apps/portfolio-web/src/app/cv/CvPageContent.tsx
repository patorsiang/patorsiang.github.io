import type { CvLanguage, CvRoleId, GeneratedCV } from "@patorsiang/cv-engine";
import { sanitizeUrl } from "@patorsiang/utils";

import { TextLink } from "@/components/atoms/TextLink";
import { ExperienceCard } from "@/components/molecules/ExperienceCard";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { SkillGroup } from "@/components/molecules/SkillGroup";
import { CVSection } from "@/components/organisms/CVSection";
import { PageShell } from "@/components/templates/PageShell";

import { CvToolbar } from "./CvToolbar";

const sectionLabels = {
  en: {
    summary: "Professional Summary",
    skills: "Technical Skills",
    experience: "Work Experience",
    projects: "Selected Projects",
    education: "Education",
    awards: "Awards & Activities",
    languages: "Languages",
  },
  th: {
    summary: "สรุปประสบการณ์",
    skills: "ทักษะด้านเทคนิค",
    experience: "ประสบการณ์ทำงาน",
    projects: "โปรเจกต์ที่คัดเลือก",
    education: "การศึกษา",
    awards: "รางวัลและกิจกรรม",
    languages: "ภาษา",
  },
} as const satisfies Record<CvLanguage, Record<string, string>>;

const portfolioQrCodeSrc = "/portfolio-qr.svg";
const fallbackPortfolioUrl = "https://patorsiang.github.io/";

type CvPageContentProps = {
  readonly cv: GeneratedCV;
  readonly selection: {
    readonly role: CvRoleId;
    readonly lang: CvLanguage;
  };
};
export function CvPageContent({ cv, selection }: CvPageContentProps) {
  const labels = sectionLabels[selection.lang];
  const portfolioLink =
    cv.header.links.find((link) => link.label.toLowerCase() === "portfolio") ??
    ({ label: "Portfolio", url: fallbackPortfolioUrl } as const);
  const portfolioDisplayUrl = stripUrlProtocol(portfolioLink.url);

  return (
    <PageShell contentClassName="max-w-5xl gap-8 py-8 print:max-w-none print:gap-0 print:px-0 print:py-0">
      <CvToolbar role={selection.role} lang={selection.lang} />

      <article className="cv-print-article bg-[var(--color-surface)] p-6 shadow-sm ring-1 ring-[var(--color-border)] sm:p-10 print:p-0 print:shadow-none print:ring-0">
        <header className="border-b border-[var(--color-border)] pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                {cv.header.targetTitle}
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-[var(--color-text)] sm:text-5xl print:text-3xl">
                {cv.header.name}
              </h1>
              <p className="mt-3 text-base font-medium text-[var(--color-text-muted)]">
                {cv.header.location}
              </p>
            </div>

            <address className="not-italic text-sm leading-7 text-[var(--color-text-muted)] sm:text-right">
              <a
                className="font-medium text-[var(--color-text)]"
                href={sanitizeUrl(`mailto:${cv.header.email}`)}
              >
                {cv.header.email}
              </a>
              {cv.header.links.map((link) => (
                <TextLink
                  key={link.url}
                  href={sanitizeUrl(link.url)}
                  target="_blank"
                  rel="noreferrer"
                  className="block print:hidden"
                >
                  {link.label}
                </TextLink>
              ))}
              <div className="mt-3 hidden flex-col items-end gap-1 print:flex">
                <img
                  src={portfolioQrCodeSrc}
                  alt={`QR code for ${portfolioLink.label}`}
                  className="h-20 w-20"
                />
                <span className="text-[8.5px] leading-tight text-[var(--color-text-muted)]">
                  Portfolio: {portfolioDisplayUrl}
                </span>
              </div>
            </address>
          </div>
        </header>

        <div className="cv-print-stack mt-8 space-y-8 print:space-y-0">
          <CVSection title={labels.summary}>
            <p className="text-sm leading-7 text-[var(--color-text-muted)] print:leading-6">
              {cv.summary.text}
            </p>
          </CVSection>

          <CVSection title={labels.skills} className="cv-print-skills">
            <div className="cv-print-compact-list grid gap-4 sm:grid-cols-2 print:grid-cols-2">
              {cv.skills.map((group) => (
                <SkillGroup
                  key={group.id}
                  title={group.group}
                  items={group.items}
                  variant="inline"
                />
              ))}
            </div>
          </CVSection>

          <CVSection title={labels.experience}>
            <div className="cv-print-compact-list space-y-6 print:space-y-0">
              {cv.experience.map((experience) => (
                <div key={experience.id} className="cv-print-experience">
                  <ExperienceCard
                    title={experience.title}
                    organization={experience.organization}
                    location={experience.location}
                    dateRange={formatDateRange(experience.startDate, experience.endDate)}
                    summary={experience.summary}
                    bullets={experience.bullets}
                    skills={experience.skills}
                    variant="plain"
                  />
                </div>
              ))}
            </div>
          </CVSection>

          <CVSection title={labels.projects}>
            <div className="cv-print-compact-list space-y-5 print:space-y-0">
              {cv.projects.map((project) => (
                <div key={project.id} className="cv-print-project">
                  <ProjectCard
                    title={project.title}
                    subtitle={project.subtitle}
                    summary={project.summary}
                    technologies={project.technologies}
                    links={project.links.map((link) => ({
                      label: link.label,
                      href: sanitizeUrl(link.url),
                    }))}
                    variant="plain"
                  />
                </div>
              ))}
            </div>
          </CVSection>

          <CVSection title={labels.education}>
            <div className="cv-print-compact-list space-y-4 print:space-y-0">
              {cv.education.map((education) => (
                <div key={education.id} className="cv-print-education">
                  <ExperienceCard
                    title={education.degree}
                    organization={education.organization}
                    location={education.location}
                    dateRange={formatDateRange(education.startDate, education.endDate)}
                    summary={education.summary}
                    bullets={education.bullets}
                    variant="plain"
                  />
                </div>
              ))}
            </div>
          </CVSection>

          {cv.awards.length > 0 ? (
            <CVSection title={labels.awards}>
              <ul className="space-y-2 text-sm leading-6 text-[var(--color-text-muted)]">
                {cv.awards.map((award) => (
                  <li key={award.id}>
                    <span className="font-semibold text-[var(--color-text)]">{award.title}</span>
                    {" · "}
                    {award.organization}
                  </li>
                ))}
              </ul>
            </CVSection>
          ) : null}

          <CVSection title={labels.languages}>
            <p className="cv-print-languages text-sm leading-6 text-[var(--color-text-muted)]">
              {cv.languages.map((language) => `${language.name}: ${language.level}`).join(" · ")}
            </p>
          </CVSection>
        </div>
      </article>
    </PageShell>
  );
}

function formatDateRange(startDate: string, endDate?: string) {
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

function stripUrlProtocol(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
