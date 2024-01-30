import Image from "next/image";

import { getDictionary } from "@/utils/getDictionaries";

export default async function Main({ lang }: { lang?: string }) {
  const info = await getDictionary(lang ?? "en");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Default&eyebrowType=Default&mouthType=Eating&skinColor=Light"
        alt="My Avatar"
        className="h-auto w-2/4 max-sm:w-3/4 md:w-1/4"
        width={100}
        height={100}
      />
      <h1 className="font-bold text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
        {info.name} ({info.nickname})
      </h1>

      <h1 className="text-2x1 font-bold text-center">
        It is in the process to update the website
      </h1>
    </main>
  );
}
