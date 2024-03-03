import { NextResponse } from "next/server";

import pdf from "pdfjs";
import { get } from "lodash";

import { data, University, Award, Work, Activity } from "@/data/profile";

import {
  fonts,
  fontSize,
  lineHeight,
  headerStyle,
  dateStyle,
  subheaderStyle,
  smallHeaderStyle,
  highlightStyle,
  bodyStyle,
} from "./config";
import { listDescription } from "./lib";

export async function GET() {
  const { name } = data;

  const doc = new pdf.Document({
    font: fonts.Helvetica,
    paddingLeft: 1 * pdf.cm,
    paddingRight: 1 * pdf.cm,
    properties: {
      title: `${name}'s cv`,
      author: name,
      subject: `${name}'s cv`,
      keywords: name,
      creationDate: new Date(),
    },
  });

  // Name
  doc
    .text({
      fontSize: fontSize.title,
      font: fonts.HelveticaBold,
      textAlign: "center",
      lineHeight,
    })
    .add(name);

  // Address and contact
  const addressAndContact = doc
    .cell({ paddingBottom: 0.5 * pdf.cm })
    .text({
      fontSize: fontSize.subtitle,
      textAlign: "center",
    })
    .add(data.address)
    .br();

  const contact = Object.entries(data.contact);

  contact.forEach(([key, val], idx) => {
    addressAndContact
      .add(typeof val === "object" ? `${key}: ` : "")
      .add(
        (typeof val === "object" ? val.name : `${key}: ${val}`) +
          (idx + 1 === contact.length ? "" : "; "),
        typeof val === "object" ? val.opt : {}
      );
  });

  // main hr
  doc.cell({ borderWidth: 0.5 });

  // Education and  Awards, Work Experience, Extra-Curricular Activities
  Object.entries(data.info).forEach(([key, val]) => {
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
        const uniDetail = val as University;
        detail.add(
          `${uniDetail.school}${
            uniDetail?.university ? `, ${uniDetail?.university}` : ""
          }${uniDetail?.degree ? `, ${uniDetail?.degree}` : ""}`,
          subheaderStyle
        );

        if (uniDetail?.major || uniDetail?.gpa) {
          detail
            .br()
            .add(uniDetail?.major ? "Major:" : "", subheaderStyle)
            .add(uniDetail?.major ?? "")
            .add(uniDetail?.gpa ? "GPA:" : "", subheaderStyle)
            .add(uniDetail?.gpa ?? "");
        }

        if (uniDetail?.favoriteSubjects) {
          detail
            .br()
            .add(
              uniDetail.favoriteSubjects ? "Favorite Subject: " : "",
              subheaderStyle
            )
            .add(uniDetail.favoriteSubjects.join(", "));
        }
      }
      // Awards & Extra-Curricular Activities
      else if ((val as Award)?.name) {
        const awardDetail = val as Award;
        // special for Extra-Curricular Activities
        detail.add(
          awardDetail.name,
          key === "Extra-Curricular Activities"
            ? { font: fonts.HelveticaBold }
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
          .add(
            [company, location].filter((val) => val).join(", "),
            smallHeaderStyle
          );

        listDescription(detail, val as Work);
      }
    });
    // hr
    doc.cell({ borderWidth: 0.25 });
  });

  // other, such as hobby
  Object.entries(data.etc).forEach(([key, val]) => {
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
  doc.cell({ borderWidth: 0.25 });

  // References
  doc
    .text(headerStyle)
    .add(data.references.length ? "References" : "References upon request");

  data.references.forEach((val, idx) => {
    const refDetails = Object.entries(val);
    doc.text(highlightStyle).add(`reference #${idx + 1}`);
    refDetails.forEach(([key, ref], idx) => {
      const refDetail = doc.text(`${key}: ${ref}`, bodyStyle);
      if (idx === refDetails.length - 1) {
        refDetail.br();
      }
    });
  });

  const buf = await doc.asBuffer();

  const contentType = "application/pdf";

  const blob = new Blob([buf], { type: contentType });

  const headers = new Headers();

  headers.set("Content-Type", contentType);

  return new NextResponse(blob, { status: 200, statusText: "OK", headers });
}
