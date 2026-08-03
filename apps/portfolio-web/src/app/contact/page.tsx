import { profile } from "@patorsiang/content";
import { sanitizeUrl } from "@patorsiang/utils";
import type { Metadata } from "next";

import { TextLink } from "@/components/atoms/TextLink";
import { PageShell } from "@/components/templates/PageShell";
import { Section } from "@/components/organisms/Section";
import { ownerName, siteName } from "@/lib/seo";

const title = "Contact";
const description = `Ways to reach Napatchol Thaipanich: email, GitHub, and LinkedIn. Based in ${profile.location.en}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `${title} | ${ownerName}`,
    description,
    url: "/contact",
    siteName,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${ownerName}`,
    description,
  },
};

const channels = [
  { label: "Email", entry: profile.contact.email },
  { label: "GitHub", entry: profile.contact.github },
  { label: "LinkedIn", entry: profile.contact.linkedin },
] as const;

export default function ContactPage() {
  return (
    <PageShell>
      <Section eyebrow="Contact" title="Direct channels.">
        <p className="mt-6 max-w-2xl text-base leading-8 text-(--color-text-muted)">
          Email is the most direct route. There is no contact form here on purpose — these go
          straight to accounts that are actually monitored.
        </p>

        <dl className="mt-8 max-w-2xl divide-y divide-(--color-border) border-y border-(--color-border)">
          {channels.map((channel) => (
            <div
              key={channel.label}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <dt className="text-sm font-medium uppercase tracking-[0.14em] text-(--color-text-subtle)">
                {channel.label}
              </dt>
              <dd className="text-base">
                <TextLink
                  href={sanitizeUrl(channel.entry.url)}
                  target={channel.label === "Email" ? undefined : "_blank"}
                  rel={channel.label === "Email" ? undefined : "noreferrer"}
                >
                  {channel.entry.label.en}
                </TextLink>
              </dd>
            </div>
          ))}

          <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
            <dt className="text-sm font-medium uppercase tracking-[0.14em] text-(--color-text-subtle)">
              Location
            </dt>
            <dd className="text-base text-(--color-text-muted)">{profile.location.en}</dd>
          </div>
        </dl>
      </Section>
    </PageShell>
  );
}
