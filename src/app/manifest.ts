import { MetadataRoute } from "next";

export default function manifest():
  | MetadataRoute.Manifest
  | {
      screenshots: Array<{
        src: string;
        type: string;
        sizes: string;
        form_factor: string;
      }>;
    } {
  return {
    name: "Napatchol Thaipanich's Profile",
    short_name: "Napatchol Thaipanich's Profile",
    description: "Napatchol Thaipanich's Profile",
    scope: "/",
    start_url: "/",
    display: "standalone",
    background_color: "#4682b4",
    theme_color: "#4682b4",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/x-icon",
      },
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/icons/apple-touch-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/1.png",
        type: "image/png",
        sizes: "540x720",
        form_factor: "wide",
      },
      {
        src: "/screenshots/1.png",
        type: "image/png",
        sizes: "540x720",
        form_factor: "narrow",
      },
    ],
  };
}