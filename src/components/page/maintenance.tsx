import Image from "next/image";
// import { getTranslations } from "next-intl/server";

import { TextAnimation } from "../animation";

export default async function Maintenance() {
  // const t = await getTranslations("Index");

  return (
    <main className="flex flex-col items-center justify-between gap-10 p-12 pt-[calc(3rem-75px)] md:p-24 lg:py-[calc(6rem-75px)] sm:px-24 md:px-48 lg:px-64">
      {/* Avatar */}
      {/* https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Default&eyebrowType=Default&mouthType=Eating&skinColor=Light */}
      <Image
        src="/imgs/avataaars.svg"
        alt="My Avatar"
        className={"drop-shadow-2xl h-auto w-3/4 sm:w-2/4 lg:w-1/4"}
        width={100}
        height={100}
        priority
      />
      <h1 className="main-introduction text-center main-h1">
        This part is in the process of maintaining.
      </h1>
    </main>
  );
}
