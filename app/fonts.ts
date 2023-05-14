import { Noto_Sans_Thai, Noto_Sans_KR } from "next/font/google";

export const noto_sans_th = Noto_Sans_Thai({
  weight: ["400", "500", "700"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
});

export const noto_sans_kr = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
});
