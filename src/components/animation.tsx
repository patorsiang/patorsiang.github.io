export const CharacterAnimation = ({
  word,
  idx,
}: {
  word: string;
  idx: number;
}) => {
  const characters = word
    .split("")
    .reduce((accumulator: Array<string>, character: string) => {
      if (/[\u0E31\u0E34\u0E4c]/u.test(character)) {
        accumulator[accumulator.length - 1] += character;
      } else {
        accumulator.push(character);
      }
      return accumulator;
    }, []);

  return characters.map((char, index) => (
    <span
      key={`char_${idx}_${index}`}
      className={`animate-[slideIn_2s_ease-in] inline-block animation-delay-0`}
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
    <span key={index} className="inline">
      {index ? " " : ""}
      <CharacterAnimation word={word} idx={index} />
    </span>
  ));
};
