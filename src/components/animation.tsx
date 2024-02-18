import { clsx } from "clsx";

export const CharacterAnimation = ({
  word,
  idx,
}: {
  word: string;
  idx: number;
}) => {
  const characters = word.split("");

  return characters.map((char, index) => (
    <span
      key={`char_${idx}_${index}`}
      className={`animate-[slideIn_2s_ease-in] inline-block text-gray-700 animation-delay-0`}
      style={{
        animationDelay: `${0.1 * (index + 1) * (idx + 1)}s`,
      }}
    >
      {char}
    </span>
  ));
};

export const TextAnimation = ({ text }: { text: string }) => {
  const words = text.split(" ");

  return words.map((word, index) => (
    <span key={index} className={clsx("inline", { "ms-4": index !== 0 })}>
      <CharacterAnimation word={word} idx={index} />
    </span>
  ));
};
