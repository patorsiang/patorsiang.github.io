import { IBM_Plex_Sans_Thai, IBM_Plex_Sans_KR } from "next/font/google";

export const sans_th = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "700"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
});

export const sans_kr = IBM_Plex_Sans_KR({
  weight: ["400", "500", "700"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
});
