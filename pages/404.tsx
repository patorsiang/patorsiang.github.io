import { Stack, Typography } from "@mui/material";

// pages/NotFound.js
export default function Custom404() {
  return (
    <Stack height="calc(100vh - 96px - 110px)" textAlign="center">
      <Stack my="auto" spacing={4}>
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="h3">404 - Page Not Found</Typography>
        <Typography variant="h6">
          The page you were looking for was not found. <br />
          It might have been removed, renamed, or did not exist in the first
          place.
        </Typography>
      </Stack>
    </Stack>
  );
}
