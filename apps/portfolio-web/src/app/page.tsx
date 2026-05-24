import { experiences, profile, projects, skills } from "@patorsiang/content";
import { generateCV } from "@patorsiang/cv-engine";
import Link from "next/link";

type ExperienceItem = (typeof experiences)[number];

const projectOrder = new Set(
  generateCV("fullstack_engineer", "en").projects.map((project) => project.id),
);

const featuredProjects = projects.filter(
  (project) => project.placement === "featured-project" && projectOrder.has(project.id),
);

const workExperiences = experiences.filter(
  (experience) => experience.type === "work" || experience.type === "internship",
);

const educationExperiences = experiences.filter((experience) => experience.type === "education");

function formatDateRange(startDate: string, endDate?: string) {
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-10 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-8 border-b border-zinc-200 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700">
              {profile.handle}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-zinc-950 sm:text-6xl">
              {profile.name.en}
            </h1>
            <p className="mt-4 text-xl font-medium text-zinc-700">{profile.role.en}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">{profile.headline.en}</p>
          </div>

          <nav aria-label="Contact links" className="flex flex-wrap gap-3">
            {profile.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-900 transition hover:border-teal-700 hover:text-teal-800"
              >
                {link.label.en}
              </a>
            ))}
            <Link
              href="/cv"
              className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-900 transition hover:border-teal-700 hover:text-teal-800"
            >
              View CV
            </Link>
            <a
              href={profile.contact.email.url}
              className="inline-flex h-11 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-teal-800"
            >
              Email
            </a>
          </nav>
        </header>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <SectionHeading eyebrow="About" title="Practical software, clear product thinking." />
            <div className="mt-6 space-y-5 text-base leading-8 text-zinc-700">
              {profile.summary.map((paragraph) => (
                <p key={paragraph.en}>{paragraph.en}</p>
              ))}
            </div>
          </div>

          <aside className="border-l-0 border-zinc-200 lg:border-l lg:pl-8">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
              Location
            </p>
            <p className="mt-3 text-lg font-semibold text-zinc-950">{profile.location.en}</p>
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
              Public identity
            </p>
            <p className="mt-3 text-lg font-semibold text-zinc-950">
              {profile.nickname.en} / {profile.nickname2.en}
            </p>
          </aside>
        </section>

        <section>
          <SectionHeading eyebrow="Experience" title="Work and education." />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <ExperienceColumn title="Work" items={workExperiences} />
            <ExperienceColumn title="Education" items={educationExperiences} />
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="Projects" title="Selected project samples." />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.12em] text-teal-700">
                  <span>{project.category}</span>
                  <span aria-hidden="true">/</span>
                  <span>{project.status}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-zinc-950">{project.title.en}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-700">{project.summary.en}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-teal-800 underline-offset-4 hover:underline"
                    >
                      {link.label.en}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="Skills" title="Core skill groups." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group) => (
              <article
                key={group.id}
                className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-950">
                  {group.label.en}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-medium text-zinc-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: Readonly<{
  eyebrow: string;
  title: string;
}>) {
  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold text-zinc-950 sm:text-3xl">{title}</h2>
    </div>
  );
}

function ExperienceColumn({
  title,
  items,
}: Readonly<{
  title: string;
  items: readonly ExperienceItem[];
}>) {
  return (
    <div>
      <h3 className="text-base font-semibold text-zinc-950">{title}</h3>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
              {formatDateRange(item.startDate, item.endDate)}
            </p>
            <h4 className="mt-3 text-lg font-semibold text-zinc-950">{item.title.en}</h4>
            <p className="mt-1 text-sm font-medium text-zinc-600">
              {item.organization.en} · {item.location.en}
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-700">{item.summary.en}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-700">
              {item.highlights.slice(0, 2).map((highlight) => (
                <li key={highlight.en}>- {highlight.en}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
