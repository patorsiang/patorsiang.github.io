import type { ContentMeta, Link } from "./common";

export type Profile = ContentMeta & {
  readonly name: string;
  readonly handle: string;
  readonly nickname: string;
  readonly nickname2: string;
  readonly role: string;
  readonly location: string;
  readonly headline: string;
  readonly summary: readonly string[];
  readonly contact: {
    readonly email: Link;
    readonly github: Link;
    readonly linkedin: Link;
  };
  readonly links: readonly Link[];
};
