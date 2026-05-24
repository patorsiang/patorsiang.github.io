import { buildCVOutput } from "@patorsiang/cv-engine";
import type { GeneratedCvExperience, GeneratedCvProject } from "@patorsiang/cv-engine";
import Link from "next/link";
import type { ReactNode } from "react";
import { PrintButton } from "./PrintButton";
import { buildCvExportFilename, resolveCvSelection } from "./cv-request";

type SearchParams =
  | Record<string, string | string[] | undefined>
  | URLSearchParams
  | Promise<Record<string, string | string[] | undefined> | URLSearchParams>;

const roleLabels = {
  fullstack_engineer: "Full-Stack Engineer",
  ai_ml_engineer: "AI / ML Engineer",
  security_engineer: "Security Engineer",
} as const;

export default async function CvPage({
  searchParams,
}: Readonly<{
  searchParams?: SearchParams;
}>) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const selection = resolveCvSelection(resolvedSearchParams);
  const cv = buildCVOutput(selection.role, selection.lang);

  const roleHref = (role: keyof typeof roleLabels) =>
    `/cv?role=${role}&lang=${selection.lang}`;
  const jsonHref = `/cv/export/json?role=${selection.role}&lang=${selection.lang}`;
  const markdownHref = `/cv/export/markdown?role=${selection.role}&lang=${selection.lang}`;

  return (
    <main className="min-h-screen bg-stone-50 text-zinc-950 print:bg-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 lg:px-10 print:max-w-none print:px-0 print:py-0">
        <div className="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-6 print:hidden">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
            >
              Back to portfolio
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              {Object.entries(roleLabels).map(([role, label]) => {
                const active = role === selection.role;

                return (
                  <Link
                    key={role}
                    href={roleHref(role as keyof typeof roleLabels)}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition",
                      active
                        ? "border-teal-700 bg-teal-50 text-teal-900"
                        : "border-zinc-300 bg-white text-zinc-900 hover:border-teal-700 hover:text-teal-800",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={jsonHref}
              className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900 transition hover:border-teal-700 hover:text-teal-800"
              download={buildCvExportFilename(selection.role, selection.lang, "json")}
            >
              Download JSON
            </a>
            <a
              href={markdownHref}
              className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900 transition hover:border-teal-700 hover:text-teal-800"
              download={buildCvExportFilename(selection.role, selection.lang, "md")}
            >
              Download Markdown
            </a>
            <PrintButton />
          </div>
        </div>

        <article className="bg-white p-6 shadow-sm ring-1 ring-zinc-200 sm:p-10 print:p-0 print:shadow-none print:ring-0">
          <header className="border-b border-zinc-200 pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
                  {cv.header.targetTitle}
                </p>
                <h1 className="mt-3 text-3xl font-semibold text-zinc-950 sm:text-5xl print:text-3xl">
                  {cv.header.name}
                </h1>
                <p className="mt-3 text-base font-medium text-zinc-700">{cv.header.location}</p>
              </div>

              <address className="not-italic text-sm leading-7 text-zinc-700 sm:text-right">
                <a className="font-medium text-zinc-950" href={`mailto:${cv.header.email}`}>
                  {cv.header.email}
                </a>
                {cv.header.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-teal-800 underline-offset-4 hover:underline print:text-zinc-800"
                  >
                    {link.label}
                  </a>
                ))}
              </address>
            </div>
          </header>

          <div className="mt-8 space-y-8 print:mt-6 print:space-y-5">
            <CvSection title="Professional Summary">
              <p className="text-sm leading-7 text-zinc-700 print:leading-6">{cv.summary.text}</p>
            </CvSection>

            <CvSection title="Technical Skills">
              <div className="grid gap-4 sm:grid-cols-2 print:grid-cols-2 print:gap-3">
                {cv.skills.map((group) => (
                  <div key={group.id}>
                    <h3 className="text-sm font-semibold text-zinc-950">{group.group}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-700">{group.items.join(", ")}</p>
                  </div>
                ))}
              </div>
            </CvSection>

            <CvSection title="Work Experience">
              <div className="space-y-6 print:space-y-4">
                {cv.experience.map((experience) => (
                  <ExperienceItem key={experience.id} experience={experience} />
                ))}
              </div>
            </CvSection>

            <CvSection title="Selected Projects">
              <div className="space-y-5 print:space-y-4">
                {cv.projects.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            </CvSection>

            <CvSection title="Education">
              <div className="space-y-4">
                {cv.education.map((education) => (
                  <section key={education.id}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="text-base font-semibold text-zinc-950">{education.degree}</h3>
                      <p className="text-sm font-medium text-zinc-600">
                        {formatDateRange(education.startDate, education.endDate)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-zinc-700">
                      {education.organization} · {education.location}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-700">{education.summary}</p>
                  </section>
                ))}
              </div>
            </CvSection>

            {cv.awards.length > 0 ? (
              <CvSection title="Awards & Activities">
                <ul className="space-y-2 text-sm leading-6 text-zinc-700">
                  {cv.awards.map((award) => (
                    <li key={award.id}>
                      <span className="font-semibold text-zinc-950">{award.title}</span>
                      {" · "}
                      {award.organization}
                    </li>
                  ))}
                </ul>
              </CvSection>
            ) : null}

            <CvSection title="Languages">
              <p className="text-sm leading-6 text-zinc-700">
                {cv.languages.map((language) => `${language.name}: ${language.level}`).join(" · ")}
              </p>
            </CvSection>
          </div>
        </article>
      </div>
    </main>
  );
}

function CvSection({ title, children }: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <section>
      <h2 className="border-b border-zinc-200 pb-2 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-950">
        {title}
      </h2>
      <div className="mt-4 print:mt-3">{children}</div>
    </section>
  );
}

function ExperienceItem({ experience }: Readonly<{ experience: GeneratedCvExperience }>) {
  return (
    <section>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-base font-semibold text-zinc-950">{experience.title}</h3>
        <p className="text-sm font-medium text-zinc-600">
          {formatDateRange(experience.startDate, experience.endDate)}
        </p>
      </div>
      <p className="mt-1 text-sm font-medium text-zinc-700">
        {experience.organization} · {experience.location}
      </p>
      <p className="mt-2 text-sm leading-6 text-zinc-700">{experience.summary}</p>
      <ul className="mt-2 space-y-1 text-sm leading-6 text-zinc-700">
        {experience.bullets.map((bullet) => (
          <li key={bullet}>- {bullet}</li>
        ))}
      </ul>
      <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
        {experience.skills.join(" · ")}
      </p>
    </section>
  );
}

function ProjectItem({ project }: Readonly<{ project: GeneratedCvProject }>) {
  return (
    <section>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-base font-semibold text-zinc-950">{project.title}</h3>
        <p className="text-sm font-medium text-zinc-600">{project.subtitle}</p>
      </div>
      <p className="mt-2 text-sm leading-6 text-zinc-700">{project.summary}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-700">{project.technologies.join(", ")}</p>
      {project.links.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-3 text-sm font-semibold">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-teal-800 underline-offset-4 hover:underline print:text-zinc-800"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function formatDateRange(startDate: string, endDate?: string) {
  return endDate ? `${startDate} - ${endDate}` : startDate;
}
