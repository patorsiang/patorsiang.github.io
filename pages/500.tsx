// pages/ServerError.js
import { Stack, Typography } from "@mui/material";
import { NextSeo } from "next-seo";

import DEFAULT_SEO from "@utility/next-seo.config";

// pages/NotFound.js
export default function Custom500() {
  const { title, ...rest } = DEFAULT_SEO;
  return (
    <>
      <NextSeo title="404" titleTemplate={`${title} | %s`} {...rest} />
      <Stack height="calc(100vh - 96px - 110px)" textAlign="center">
        <Stack my="auto" spacing={4}>
          <Typography variant="h1">Oops!</Typography>
          <Typography variant="h3">500 - Server-side error occurred</Typography>
          <Typography variant="h6">
            The owner is checking the mistake. Please come back later.
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
