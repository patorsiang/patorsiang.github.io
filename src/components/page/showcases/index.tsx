"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { useSplitPathname } from "@/utils/hooks/useSplitPathname";

export default function Showcases() {
  const t = useTranslations("page.showcases");
  const { currentLang } = useSplitPathname();

  console.log(currentLang);

  const data = [
    {
      image: {
        src: "/imgs/showcases/map-screenshot.png",
        alt: "my 2d-portfolio-game",
      },
      title: t.raw("items")[0].title,
      description: t.raw("items")[0].description,
      link: {
        href: `/${currentLang}/showcases/2d-game-portfolio`,
      },
    },
  ];

  return (
    <main className="self-container">
      <h1 className="about-h1">{t("title")}</h1>
      <div className="px-3 grid gap-12 md:gap-6 xl:gap-12 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {data.map((ele, id) => (
          <div
            key={id}
            className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full h-max"
          >
            <div className="relative aspect-video mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
              <Image
                className={"main-avatar-image"}
                width={100}
                height={100}
                priority
                {...ele.image}
              />
            </div>

            <div className="p-6">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {ele.title}
              </h5>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {ele.description}
              </p>
            </div>
            <div className="p-6 pt-0">
              <a
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                {...ele.link}
              >
                {t("link")}
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
