import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Default&eyebrowType=Default&mouthType=Eating&skinColor=Light"
        alt="My Avatar"
        className="h-auto w-2/4 max-sm:w-3/4 md:w-2/4"
        width={100}
        height={100}
      />
      <h1 className="text-2x1 font-bold">
        It is in the process to update the website
      </h1>
    </main>
  );
}
