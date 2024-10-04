import { Text, Document, Font } from "pdfjs";
import { Work, Activity } from "@/data/types/profile";

export const listDescription = (doc: Text, data: Activity | Work) => {
  const description = data?.description;
  if (description) {
    description.forEach((desc) => {
      doc.br().add(`- ${desc}`);
    });
  }
};

type Styles = {
  [key: string]: {
    fontSize?: number;
    font?: Font;
    lineHeight?: number;
    color?: number;
    paddingTop?: number;
  };
};

export const interestingThings = (
  etc: {
    [key: string]:
      | string[]
      | {
          [key: string]: string;
        };
  },
  doc: Document,
  { headerStyle, dateStyle, spaceHrStyle }: Styles
) => {
  doc.cell(spaceHrStyle);

  Object.entries(etc).forEach(([key, val]) => {
    const table = doc.table({
      widths: [90, null],
      paddingBottom: 5,
    });

    const tr = table.row();

    tr.cell(key, headerStyle);

    const details = tr.cell();
    if (Array.isArray(val)) {
      details.text(val.join(", "), dateStyle);
    } else {
      Object.entries(val as { [key: string]: string })
        .map(([key, val]) => `${key}${val ? ": " + val : ""}`)
        .forEach((val) => {
          details.text(val, dateStyle);
        });
    }
  });

  doc.cell(spaceHrStyle);
};

export const partTimeFormat = (
  doc: Document,
  {
    date,
    title,
    location,
    shortDescription,
  }: {
    date: string;
    title: Array<string | undefined>;
    location: string;
    shortDescription?: Array<string>;
  },
  { dateStyle, subheaderStyle, locationStyle }: Styles
) => {
  const table = doc.table({
    widths: [90, null],
    paddingBottom: 5,
  });

  const tr = table.row();
  tr.cell(date, dateStyle);
  const detail = tr.cell().text(dateStyle);
  detail.add(title.filter((a) => a).join(" - "), subheaderStyle);
  detail.br().add(location, locationStyle);
  shortDescription?.forEach((desc) => {
    detail.br().add(`- ${desc}`);
  });
};
