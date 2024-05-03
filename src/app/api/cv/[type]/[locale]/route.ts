import { NextRequest } from "next/server";

import pdf from "pdfjs";
import { get } from "lodash";

import { locales } from "#/i18n";

import { types, getStyle, getTokenStyle } from "@/app/api/config";

import { listDescription } from "@/app/api/lib";
import { getDictionary } from "@/utils/getDictionaries";

import { Data, University, Award, Activity, Work } from "@/data/profile.d";

export const generateStaticParams = () => {
  return types.flatMap((type) => locales.map((locale) => ({ type, locale })));
};

export async function GET(
  request: NextRequest,
  { params: { type, locale } }: { params: { type: string; locale: string } }
) {
  if (!locales.includes(locale as any))
    return new Response("not found", { status: 404 });

  const style = getTokenStyle(locale ?? "en");
  const {
    nameStyle,
    addressStyle,
    summaryStyle,
    dateStyle,
    headerStyle,
    subheaderStyle,
    normalHrStyle,
    mainHrStyle,
  } = getStyle({
    type,
    locale,
  });

  const { page, detail } = await getDictionary(locale ?? "en");
  const {
    name,
    summary,
    address,
    shortAddress,
    contact: contacts,
    info,
    etc,
    references,
  } = detail as Data;
  const doc = new pdf.Document({
    font: style.fontFamily.regular,
    ...(type === "work" ? { padding: 1 * pdf.cm } : {}),
    properties: {
      title: `napatchol thaipanich's cv`,
      author: "napatchol thaipanich",
      subject: `napatchol thaipanich's cv`,
      keywords: name,
      creationDate: new Date(),
    },
  });

  // Name
  doc.text(nameStyle).add(name);

  // Address and contact
  const addressAndContact = doc
    .text(addressStyle)
    .add(type === "academic" ? address : shortAddress)
    .br();
  const contact = Object.entries(contacts);

  contact.forEach(([key, val]) => {
    addressAndContact
      .add(typeof val === "object" ? `${key}: ` : "")
      .add(
        typeof val === "object" ? val.name : `${key}: ${val}`,
        typeof val === "object" ? val.opt : {}
      );
  });
  addressAndContact.br();
  // Summary
  if (type === "work") {
    doc.text(summaryStyle).add(summary).br();
  }

  // main hr
  doc.cell(mainHrStyle);

  // Education and  Awards, Work Experience, Extra-Curricular Activities
  Object.entries(info).forEach(([key, val]) => {
    doc.text(headerStyle).add(key);
    Object.values(val).forEach((val) => {
      const table = doc.table({
        widths: [90, null],
        paddingBottom: 5,
      });
      const tr = table.row();

      tr.cell(val.date, dateStyle);

      const detail = tr.cell().text(dateStyle);

      // Education
      if ((val as University)?.school) {
        const { school, university, degree, major, gpa, favoriteSubjects } =
          val as University;
        detail.add(
          [school, university, degree].filter((temp) => temp).join(", "),
          subheaderStyle
        );

        const moreDetails: { [key: string]: string } = {};

        if (!!major) {
          moreDetails[get(page, "aboutMe.major")] = major;
        }
        if (!!gpa) {
          moreDetails[get(page, "aboutMe.gpa")] = gpa;
        }

        Object.entries(moreDetails).forEach((details) => {
          detail.add(`${details[0]}: `, subheaderStyle).add(details[1] ?? "");
        });

        if (favoriteSubjects) {
          detail
            .br()
            .add(
              favoriteSubjects
                ? `${get(page, "aboutMe.favoriteSubject")}:`
                : "",
              subheaderStyle
            )
            .add(favoriteSubjects.join(", "));
        }
      }
      // Awards & Extra-Curricular Activities
      else if ((val as Award)?.name) {
        const awardDetail = val as Award;
        // special for Extra-Curricular Activities
        detail.add(
          awardDetail.name,
          key === "Extra-Curricular Activities"
            ? { font: style.fontFamily.bold }
            : {}
        );
        listDescription(detail, val as Activity);
      }
      // Work Experience
      else {
        const { title, type, company, location } = val as Work;
        detail
          .add([title, type].join(", "), subheaderStyle)
          .br()
          .add([company, location].filter((val) => val).join(", "), {
            fontSize: style.fontSize.smallHeader,
            font: style.fontFamily.bold,
            lineHeight: style.lineHeight,
          });

        listDescription(detail, val as Work);
      }
    });
    // hr
    doc.cell(normalHrStyle);
  });

  // other, such as hobby
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
      Object.entries(val)
        .map(([key, val]) => `${key}${val ? ": " + val : ""}`)
        .forEach((val) => {
          details.text(val, dateStyle);
        });
    }
  });

  // last hr
  doc.cell(normalHrStyle);

  // References
  if (type === "academic") {
    doc
      .text(headerStyle)
      .add(references.length ? "References" : "References upon request");

    references.forEach((val, idx) => {
      const refDetails = Object.entries(val);
      doc
        .text({
          font: style.fontFamily.oblique,
        })
        .add(`reference #${idx + 1}`);
      refDetails.forEach(([key, ref], idx) => {
        const refDetail = doc.text(`${key}: ${ref}`, {
          fontSize: style.fontSize.subtitle,
        });
        if (idx === refDetails.length - 1) {
          refDetail.br();
        }
      });
    });
  }

  const buf = await doc.asBuffer();

  const contentType = "application/pdf";

  const blob = new Blob([buf], { type: contentType });

  return new Response(blob, {
    headers: { "Content-Type": contentType },
  });
}
