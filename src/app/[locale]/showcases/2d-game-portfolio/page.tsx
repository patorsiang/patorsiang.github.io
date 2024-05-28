import GamePortfolio from "@/components/page/showcases/2d-game-portfolio";
import { metadata as meta } from "@/data/profile";

export const metadata = { ...meta, title: `${meta.title} | My Beta Story` };

export default async function Page() {
  return <GamePortfolio />;
}
