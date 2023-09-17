import meta from "@/public/manifest.json";

export const defaultMetadata = {
  metadataBase: new URL(meta.homepage_url),
  title: meta.name,
  description: meta.description,
  applicationName: meta.short_name,
  authors: [{ name: meta.author }],
  keywords: meta.description.split(" ").join(","),
  referrer: "origin",
  themeColor: meta.theme_color,
  colorScheme: "dark",
  viewport: { width: "device-width", initialScale: 1 },
  creator: meta.author,
  publisher: "github page",
  icons: meta.icons
    .map(({ sizes, src, ...icon }) => [
      { rel: "icon", size: sizes, url: src, ...icon },
      { rel: "apple-touch-icon", size: sizes, url: src, ...icon },
    ])
    .flat(),
  manifest: "/manifest.json",
  openGraph: {
    card: meta.name,
    creator: meta.author,
    images: meta.icons[meta.icons.length - 1].src,
  },
};
