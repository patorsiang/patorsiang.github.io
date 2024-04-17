export const CharacterAnimation = ({
  word,
  idx,
  delay,
}: {
  word: string;
  idx: number;
  delay?: number;
}) => {
  const characters = word
    .split("")
    .reduce((accumulator: Array<string>, character: string) => {
      if (/[\u0E31\u0E34\u0E4c\u0E37\u0E48]/u.test(character)) {
        accumulator[accumulator.length - 1] += character;
      } else {
        accumulator.push(character);
      }
      return accumulator;
    }, []);

  return characters.map((char, index) => (
    <span
      key={`char_${idx}_${index}`}
      className={`motion-safe:animate-[slideIn_2s_ease-in] inline-block`}
      style={{
        animationDelay: `${(delay ?? 1) * 0.1 * (index + 1) * (idx + 1)}s`,
        opacity: 0,
        animationFillMode: "forwards",
      }}
    >
      {char}
    </span>
  ));
};

export const TextAnimation = ({
  text,
  ...props
}: {
  text: string;
  delay?: number;
}) => {
  const words = text.split(" ");

  return words.map((word, index) => (
    <span key={index} className="inline">
      {index ? " " : ""}
      <CharacterAnimation word={word} idx={index} {...props} />
    </span>
  ));
};
