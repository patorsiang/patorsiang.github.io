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
      domain: "patorseing.github.io/",
      ...i18n,
    },
  ],
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|th|kr)/:path*"],
};
