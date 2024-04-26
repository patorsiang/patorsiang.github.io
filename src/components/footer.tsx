import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoTailwindCss } from "react-icons/bi";
import { SiGithubactions } from "react-icons/si";
import { BsFiletypePdf } from "react-icons/bs";
import { FaReact } from "react-icons/fa";

const iconSize = "1.5em";

export default function Footer() {
  const techList = [
    { icon: TbBrandNextjs, label: "Next.js" },
    { icon: BiLogoTailwindCss, label: "TailwindCSS" },
    { icon: SiGithubactions, label: "Github Actions" },
    { icon: BsFiletypePdf, label: "PDFJS" },
    { icon: FaReact, label: "react-icons" },
  ];
  return (
    <footer>
      <p className="my-auto font-semibold">Powered by</p>
      {techList.map(({ icon: Icon, label }) => (
        <div className="chip" key={label}>
          <Icon size={iconSize} />
          <p>{label}</p>
        </div>
      ))}
    </footer>
  );
}
