import pdf from "pdfjs";
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
};

const start = 12;

export const fontSize = {
  title: start,
  subtitle: start - 3,
  header: start - 2,
  smallHeader: start - 4,
};

export const lineHeight = 1.5;

export const headerStyle = {
  fontSize: fontSize.header,
  font: fonts.HelveticaBold,
  lineHeight,
};

export const dateStyle = {
  fontSize: fontSize.subtitle,
  font: fonts.Helvetica,
  lineHeight,
};

export const subheaderStyle = {
  fontSize: fontSize.subtitle,
  font: fonts.HelveticaBold,
  lineHeight,
};

export const smallHeaderStyle = {
  fontSize: fontSize.smallHeader,
  font: fonts.HelveticaBold,
  lineHeight,
};
