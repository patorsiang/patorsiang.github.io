import pdf from "pdfjs";
import fs from "fs";
import Symbol from "pdfjs/font/Symbol";
import HelveticaBold from "pdfjs/font/Helvetica-Bold";
import HelveticaBoldOblique from "pdfjs/font/Helvetica-BoldOblique";
import HelveticaOblique from "pdfjs/font/Helvetica-Oblique";
import Helvetica from "pdfjs/font/Helvetica";

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

export const getStyle = (locale?: string | null) => {
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
