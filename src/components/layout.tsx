import Navbar from "./navbar";
import LanguageBar from "./langBar";

export default function Layout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  return (
    <>
      <Navbar lang={lang} />
      <LanguageBar lang={lang} />
      {/* TODO: language */}
      {children}
    </>
  );
}
