import Image from "next/image";
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
            href={t_info(`contact.${key}.opt.link`) ?? ""}
            label={key}
            target="_blank"
          >
            <Icon size={iconSize} />
          </IconLink>
        ))}
        <DownloadCVLink />
      </section>
      {/* Subtitle */}
      <h2
        className="main-introduction-subheading"
        dangerouslySetInnerHTML={{ __html: t_info.raw("subtitle") }}
      />
    </main>
  );
}
