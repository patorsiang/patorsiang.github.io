// import { headers } from "next/headers";
import pdf from "pdfjs";
import { get } from "lodash";

import { locales } from "#/i18n";

import { getStyle } from "./config";

import { listDescription } from "./lib";
import { getDictionary } from "@/utils/getDictionaries";
import { generateStaticParamsFunc } from "@/utils/generateStaticParams";

import { Data, University, Award, Activity, Work } from "@/data/profile.d";

export const generateStaticParams = () => generateStaticParamsFunc();

export async function GET(
  request: Request,
  { params: { locale } }: { params: { locale: string } }
) {
  // const headersList = headers();
  // const language = headersList.get("accept-language");
  const language = locale;

  if (!locales.includes(language as any))
    return new Response("not found", { status: 404 });

  const style = getStyle(language ?? "en");

  const dateStyle = {
    fontSize: style.fontSize.subtitle,
    font: style.fontFamily.regular,
    lineHeight: style.lineHeight,
  };

  const headerStyle = {
    fontSize: style.fontSize.header,
    font: style.fontFamily.bold,
    lineHeight: style.lineHeight,
  };

  const subheaderStyle = {
    fontSize: style.fontSize.subtitle,
    font: style.fontFamily.bold,
    lineHeight: style.lineHeight,
  };

  const { page, detail } = await getDictionary(language ?? "en");
  const {
    name,
    address,
    contact: contacts,
    info,
    etc,
    references,
  } = detail as Data;
  const doc = new pdf.Document({
    font: style.fontFamily.regular,
    paddingLeft: 1 * pdf.cm,
    paddingRight: 1 * pdf.cm,
    properties: {
      title: `napatchol thaipanich's cv`,
      author: "napatchol thaipanich",
      subject: `napatchol thaipanich's cv`,
      keywords: name,
      creationDate: new Date(),
    },
  });

  // Name
  doc
    .text({
      fontSize: style.fontSize.title,
      font: style.fontFamily.bold,
      textAlign: "center",
      lineHeight: style.lineHeight,
    })
    .add(name);

  // Address and contact
  const addressAndContact = doc
    .cell({ paddingBottom: 0.5 * pdf.cm })
    .text({
      fontSize: style.fontSize.subtitle,
      textAlign: "center",
      lineHeight: style.lineHeight,
    })
    .add(address)
    .br();

  const contact = Object.entries(contacts);

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
            .add(
              uniDetail?.major ? `${get(page, "aboutMe.major")}:` : "",
              subheaderStyle
            )
            .add(uniDetail?.major ?? "")
            .add(
              uniDetail?.gpa ? `${get(page, "aboutMe.gpa")}:` : "",
              subheaderStyle
            )
            .add(uniDetail?.gpa ?? "");
        }

        if (uniDetail?.favoriteSubjects) {
          detail
            .br()
            .add(
              uniDetail.favoriteSubjects
                ? `${get(page, "aboutMe.favoriteSubject")}:`
                : "",
              subheaderStyle
            )
            .add(uniDetail.favoriteSubjects.join(", "));
        }
      }
      // // Awards & Extra-Curricular Activities
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
      // // Work Experience
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
    doc.cell({ borderWidth: 0.25 });
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
  doc.cell({ borderWidth: 0.25 });

  // References
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

  const buf = await doc.asBuffer();

  const contentType = "application/pdf";

  const blob = new Blob([buf], { type: contentType });

  return new Response(blob, {
    headers: { "Content-Type": contentType },
  });
}
