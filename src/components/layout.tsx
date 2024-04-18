import Navbar from "./navbar";

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
      {/* TODO: theme */}
      {/* TODO: language */}
      {children}
    </>
  );
}
