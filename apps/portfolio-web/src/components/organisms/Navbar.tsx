import { ContactLinks, type ContactLink } from "@/components/molecules/ContactLinks";

type NavbarProps = {
  readonly handle: string;
  readonly name: string;
  readonly role: string;
  readonly headline: string;
  readonly links: readonly ContactLink[];
};

export function Navbar({ handle, name, role, headline, links }: NavbarProps) {
  return (
    <header className="flex flex-col gap-8 border-b border-(--color-border) pb-10 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-(--color-accent)">
          {handle}
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
          {name}
        </h1>
        <p className="mt-4 text-xl font-medium text-(--color-text-muted)">{role}</p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-(--color-text-muted)">{headline}</p>
      </div>
      <ContactLinks links={links} />
    </header>
  );
}
