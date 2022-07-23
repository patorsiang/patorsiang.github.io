import { styled } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";

export const ExperienceSection = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(10),
  paddingRight: theme.spacing(10),
}));

export const ExperienceHead = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h4.fontSize,
}));
