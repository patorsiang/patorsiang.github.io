import pdf from "pdfjs";
import fs from "fs";
import Symbol from "pdfjs/font/Symbol";
import HelveticaBold from "pdfjs/font/Helvetica-Bold";
import HelveticaBoldOblique from "pdfjs/font/Helvetica-BoldOblique";
import HelveticaOblique from "pdfjs/font/Helvetica-Oblique";
import Helvetica from "pdfjs/font/Helvetica";

import { locales } from "#/i18n";

export const types = ["academic", "work"];

export const fonts = {
  Symbol,
  Helvetica,
  HelveticaBoldOblique,
  HelveticaOblique,
  HelveticaBold,
  Gowan: new pdf.Font(
    fs.readFileSync("./public/fonts/Gowun_Batang/GowunBatang-Regular.ttf")
  ),
  GowanBold: new pdf.Font(
    fs.readFileSync("./public/fonts/Gowun_Batang/GowunBatang-Bold.ttf")
  ),
  Sarabun: new pdf.Font(
    fs.readFileSync("./public/fonts/THSarabunNew/THSarabunNew.ttf")
  ),
  SarabunBold: new pdf.Font(
    fs.readFileSync("./public/fonts/THSarabunNew/THSarabunNew Bold.ttf")
  ),
  SarabunOblique: new pdf.Font(
    fs.readFileSync("./public/fonts/THSarabunNew/THSarabunNew Italic.ttf")
  ),
  SarabunBoldOblique: new pdf.Font(
    fs.readFileSync("./public/fonts/THSarabunNew/THSarabunNew Italic.ttf")
  ),
};

export const getFontSize = (start: number) => ({
  title: start,
  subtitle: start - 3,
  header: start - 2,
  smallHeader: start - 4,
});

export const getTokenStyle = (locale: (typeof locales)[number]) => {
  const fontSize = getFontSize(12);
  const lineHeight = 1.5;
  const defaultStyle = {
    fontFamily: {
      regular: fonts.Helvetica,
      bold: fonts.HelveticaBold,
      oblique: fonts.HelveticaOblique,
    },
    fontSize,
    lineHeight,
  };
  switch (locale) {
    case "en":
      return defaultStyle;

    case "th":
      return {
        fontFamily: {
          regular: fonts.Sarabun,
          bold: fonts.SarabunBold,
          oblique: fonts.HelveticaOblique,
        },
        fontSize: getFontSize(16),
        lineHeight: 1,
      };

    case "kr":
      return {
        fontFamily: {
          regular: fonts.Gowan,
          bold: fonts.GowanBold,
          oblique: fonts.GowanBold,
        },
        fontSize,
        lineHeight,
      };
    default:
      return defaultStyle;
  }
};

export const color = {
  primary: 0x000000,
  main: 0x0b5394,
  sub: 0x5b5b5b,
  sub2: 0x999999,
  heading: 0x23649e,
  hr: 0xbcbcbc,
};

export const getStyle = ({
  type,
  locale,
}: {
  type: (typeof types)[number];
  locale: (typeof locales)[number];
}) => {
  const style = getTokenStyle(locale ?? "en");

  const nameStyle = {
    fontSize: style.fontSize.title,
    font: style.fontFamily.bold,
    textAlign: "center" as pdf.TextAlignment,
    lineHeight: style.lineHeight,
    color: type === "academic" ? color.primary : color.main,
  };

  const positionStyle = {
    fontSize: style.fontSize.subtitle,
    font: style.fontFamily.bold,
    textAlign: "center" as pdf.TextAlignment,
    lineHeight: style.lineHeight,
    color: type === "academic" ? color.primary : color.main,
  };

  const dateStyle = {
    fontSize: style.fontSize.subtitle,
    font: style.fontFamily.regular,
    lineHeight: style.lineHeight,
  };

  const headerStyle = {
    fontSize: style.fontSize.header,
    font: style.fontFamily.bold,
    lineHeight: style.lineHeight,
    color: type === "academic" ? color.primary : color.main,
  };

  const subheaderStyle = {
    fontSize: style.fontSize.subtitle,
    font: style.fontFamily.bold,
    lineHeight: style.lineHeight,
  };

  const addressStyle = {
    fontSize: style.fontSize.subtitle,
    textAlign: "center" as pdf.TextAlignment,
    lineHeight: style.lineHeight,
  };

  const summaryStyle = {
    fontSize: style.fontSize.subtitle,
    textAlign: "justify" as pdf.TextAlignment,
    lineHeight: style.lineHeight,
    color: type === "academic" ? color.primary : color.sub,
  };

  const normalHrStyle = {
    borderWidth: 0.25,
    color: type === "academic" ? color.primary : color.hr,
  };
  const mainHrStyle = {
    borderWidth: 0.5,
    color: type === "academic" ? color.primary : color.hr,
  };

  const locationStyle = {
    fontSize: style.fontSize.smallHeader,
    font: style.fontFamily.bold,
    lineHeight: style.lineHeight,
  };

  const spacePaddingValue = 10;

  const spaceHrStyle = {
    paddingTop: spacePaddingValue,
  };

  const spaceHeaderStyle = {
    paddingTop: spacePaddingValue,
    paddingBottom: spacePaddingValue,
  };

  return {
    nameStyle,
    positionStyle,
    addressStyle,
    summaryStyle,
    dateStyle,
    headerStyle,
    subheaderStyle,
    normalHrStyle,
    mainHrStyle,
    locationStyle,
    spaceHrStyle,
    spaceHeaderStyle,
  };
};
