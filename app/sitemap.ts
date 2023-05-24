import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://patorseing.github.io/",
      lastModified: new Date(),
    },
    // {
    //   url: "https://patorseing.github.io//about",
    //   lastModified: new Date(),
    // },
    // {
    //   url: "https://patorseing.github.io//blog",
    //   lastModified: new Date(),
    // },
  ];
}
