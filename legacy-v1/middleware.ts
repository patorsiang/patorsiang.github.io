import createMiddleware from "next-intl/middleware";

import { i18n } from "./i18n";

export default createMiddleware({
  ...i18n,
  localePrefix: "always",
  pathnames: {
    "/": "/en",
  },
  domains: [
    {
      domain: "patorsiang.github.io/",
      locales: [...i18n.locales],
      defaultLocale: "en",
    },
  ],
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|th|kr)/:path*"],
};
