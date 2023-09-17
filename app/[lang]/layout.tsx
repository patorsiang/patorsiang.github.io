import "../globals.css";

import { sans_th, sans_kr } from "../fonts";

import { Header } from "@/components/ColorMode";
import { Box } from "@mui/material";

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
      <body
        className={lang === "kr" ? sans_kr.className : sans_th.className}
        suppressHydrationWarning={true}
      >
        <Header />
        <Box
          sx={{
            minHeight: "100vh",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          {children}
        </Box>
      </body>
    </html>
  );
}
