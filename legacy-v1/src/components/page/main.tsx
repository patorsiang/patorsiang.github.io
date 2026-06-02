import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { TextAnimation } from "../animation";
import { IconLink } from "../iconLink";
import { DownloadCVLink } from "../downloadCV";

import { contactIcons, iconSize } from "@/constants";

export default async function Main() {
  const t = await getTranslations("page.home");
  const t_info = await getTranslations("detail");

  return (
    <main className="self-container">
      {/* Avatar */}
      {/* https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Default&eyebrowType=Default&mouthType=Eating&skinColor=Light */}
      <div className="main-avatar">
        <Image
          src="/imgs/avataaars.svg"
          alt="My Avatar"
          className={"main-avatar-image"}
          width={100}
          height={100}
          priority
        />
      </div>
      <div className="typewriter">
        <p className="main-h1">Hello World!</p>
      </div>
      {/* Name */}
      <section className="main-introduction main-h1">
        <h1 className="main-introduction-h1">
          <TextAnimation
            text={t("introduction", {
              nickname: t_info("nickname"),
              fullName: t_info("name"),
            })}
            delay={0.01}
          />
        </h1>
        <h1 className="main-introduction-h1">
          <TextAnimation text={t_info("position")} />
        </h1>
      </section>
      {/* Contact */}
      <section className="main-social-media">
        {Object.entries(contactIcons).map(([key, Icon]) => (
          <IconLink
            key={key}
            href={
              key == "Email"
                ? t_info(`contact.${key}.0.opt.link`)
                : t_info(`contact.${key}.opt.link`) ?? ""
            }
            label={key}
            target="_blank"
          >
            <Icon size={iconSize} />
          </IconLink>
        ))}
        <DownloadCVLink />
      </section>
      {/* Subtitle */}
      <h2 className="main-introduction-subheading">{renderTrustedProfileText(t_info.raw("subtitle"))}</h2>
    </main>
  );
}

function renderTrustedProfileText(value: string): ReactNode {
  return value
    .split(/(<br\s*\/?>|<\/?b>)/gi)
    .filter((part) => part.length > 0)
    .reduce<ReactNode[]>((nodes, part, index, parts) => {
      const lowerPart = part.toLowerCase();

      if (lowerPart === "<br/>" || lowerPart === "<br>") {
        nodes.push(<br key={`${part}-${index}`} />);
        return nodes;
      }

      if (lowerPart === "<b>" || lowerPart === "</b>") {
        return nodes;
      }

      const previousTag = parts[index - 1]?.toLowerCase();
      const nextTag = parts[index + 1]?.toLowerCase();
      if (previousTag === "<b>" && nextTag === "</b>") {
        nodes.push(
          <strong key={`${part}-${index}`} className="font-semibold">
            {part}
          </strong>,
        );
        return nodes;
      }

      nodes.push(<Fragment key={`${part}-${index}`}>{part}</Fragment>);
      return nodes;
    }, []);
}
