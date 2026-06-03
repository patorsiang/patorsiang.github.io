import { Card } from "@/components/atoms/Card";
import { Tag } from "@/components/atoms/Tag";
import { TextLink } from "@/components/atoms/TextLink";
import { classNames } from "@/lib/classnames";

type ProjectLink = {
  readonly label: string;
  readonly href: string;
};

type ProjectCardProps = {
  readonly title: string;
  readonly summary: string;
  readonly technologies: readonly string[];
  readonly links?: readonly ProjectLink[];
  readonly meta?: readonly string[];
  readonly subtitle?: string;
  readonly variant?: "card" | "plain";
};

export function ProjectCard({
  title,
  summary,
  technologies,
  links = [],
  meta = [],
  subtitle,
  variant = "card",
}: ProjectCardProps) {
  const content = (
    <>
      {meta.length > 0 ? (
        <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-accent)]">
          {meta.map((item, index) => (
            <span key={item}>
              {index > 0 ? <span aria-hidden="true">/ </span> : null}
              {item}
            </span>
          ))}
        </div>
      ) : null}
      <div
        className={classNames(
          "flex flex-col gap-1",
          variant === "plain" && "sm:flex-row sm:items-baseline sm:justify-between",
        )}
      >
        <h3
          className={classNames(
            "font-semibold text-[var(--color-text)]",
            variant === "card" ? "mt-3 text-xl" : "text-base",
          )}
        >
          {title}
        </h3>
        {subtitle ? (
          <p className="text-sm font-medium text-[var(--color-text-subtle)]">{subtitle}</p>
        ) : null}
      </div>
      <p
        className={classNames(
          "text-sm text-[var(--color-text-muted)]",
          variant === "card" ? "mt-3 leading-7" : "mt-2 leading-6",
        )}
      >
        {summary}
      </p>
      {variant === "card" ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
          {technologies.join(", ")}
        </p>
      )}
      {links.length > 0 ? (
        <div
          className={classNames(
            "flex flex-wrap gap-3 text-sm",
            variant === "card" ? "mt-5" : "mt-2",
          )}
        >
          {links.map((link) => (
            <TextLink key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </TextLink>
          ))}
        </div>
      ) : null}
    </>
  );

  if (variant === "plain") {
    return <section>{content}</section>;
  }

  return <Card className="p-6">{content}</Card>;
}
