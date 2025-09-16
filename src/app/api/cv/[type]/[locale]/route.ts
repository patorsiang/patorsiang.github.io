import { NextRequest } from "next/server";

import pdf from "pdfjs";
import { get } from "lodash";
import fs from "fs-extra";

import { locales } from "#/i18n";

import { types, getStyle, getTokenStyle } from "@/app/api/config";

import { listDescription, interestingThings } from "@/app/api/lib";
import { getDictionary } from "@/utils/getDictionaries";

import { myName } from "@/data/profile";
import { Data, University, Award, Activity, Work } from "@/data/types/profile";

export const generateStaticParams = () => {
  return types.flatMap((type) => locales.map((locale) => ({ type, locale })));
};

export async function GET(
  _request: NextRequest,
  { params: { type, locale } }: { params: { type: string; locale: string } }
) {
  if (!locales.includes(locale as any))
    return new Response("not found", { status: 404 });

  const style = getTokenStyle((locale ?? "en") as "en" | "th" | "kr");
  const {
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
  } = getStyle({
    type,
    locale: (locale ?? "en") as "en" | "th" | "kr",
  });

  const { page, detail } = await getDictionary(locale ?? "en");
  const {
    name,
    position,
    summary,
    address,
    shortAddress,
    contact: contacts,
    info,
    etc,
    references,
    sortedInfoForVacancy,
    sortedInfoForEducation,
  } = detail as Data;
  const doc = new pdf.Document({
    font: style.fontFamily.regular,
    ...(type === "work" ? { padding: 1 * pdf.cm } : {}),
    properties: {
      title: `${myName}'s cv`,
      author: myName,
      subject: `${myName}'s cv`,
      keywords: myName,
      creationDate: new Date(),
    },
  });

  // qr code
  const jpegImage = fs.readFileSync(process.cwd() + "/public/imgs/qrcode.jpg");

  const image = new pdf.Image(jpegImage);

  doc.image(image, { width: 64, wrap: false, y: 830, x: 510 });

  // Name
  doc.text(nameStyle).add(name);

  if (type === "work") {
    // Position
    doc.text(positionStyle).add(position);
  }

  // Address and contact
  const addressAndContact = doc
    .text(addressStyle)
    .add(type === "academic" ? address : shortAddress)
    .br();
  const contact = Object.entries(contacts);

  contact.forEach(([key, val]) => {
    addressAndContact.add(typeof val === "object" ? `${key}: ` : "");
    if (Array.isArray(val)) {
      val.forEach((contact, i) => {
        addressAndContact.add(
          contact.name,
          typeof contact === "object" ? contact.opt : {}
        );
        if (i < val.length - 1) addressAndContact.add(",");
      });
    } else {
      addressAndContact.add(
        typeof val === "object" ? val.name : `${key}: ${val}`,
        typeof val === "object" ? val.opt : {}
      );
    }
  });
  addressAndContact.br();
  // Summary
  if (type === "work") {
    doc.text(summaryStyle).add(summary).br();
  }

  // main hr
  doc.cell(mainHrStyle);

  // Education and Awards, Work Experience, Extra-Curricular Activities
  (type === "work" ? sortedInfoForVacancy : sortedInfoForEducation).map(
    (topic, index, root) => {
      doc.cell(spaceHeaderStyle).text(headerStyle).add(topic);
      Object.values(info[topic]).forEach((val) => {
        const table = doc.table({
          widths: [90, null],
          paddingBottom: 5,
        });
        const tr = table.row();
        tr.cell(val.date, dateStyle);
        const detail = tr.cell().text(dateStyle);

        const { school, university, degree, major, gpa, focus, projects } =
          val as University;
        const { name } = val as Award;
        const { title: position, type, company, location } = val as Work;
        const title = [school, university, degree, position, type].filter(
          (x) => x
        );
        const address = [company, location].filter((x) => x);

        const moreDetails: { [key: string]: string } = {};

        if (!!major) {
          moreDetails[get(page, "aboutMe.major")] = major;
        }
        if (!!gpa) {
          moreDetails[get(page, "aboutMe.gpa")] = gpa;
        }

        if (title.length) {
          detail.add(title.filter((temp) => temp).join(", "), subheaderStyle);
        } else {
          detail.add(name, index === root.length - 1 ? subheaderStyle : {});
        }

        if (address.length) {
          detail.br().add(address.join(","), locationStyle);
        }

        if (Object.keys(moreDetails).length) {
          detail.br();
          Object.entries(moreDetails).forEach((details) => {
            detail.add(`${details[0]}: `, subheaderStyle).add(details[1] ?? "");
          });
        }

        listDescription(detail, val as Activity);

        if (focus) {
          detail
            .br()
            .add(
              focus ? `${get(page, "aboutMe.favoriteSubject")}:` : "",
              subheaderStyle
            )
            .add(focus.join(", "));
        }

        if (projects) {
          detail
            .br()
            .add(
              projects ? `${get(page, "aboutMe.projects")}:` : "",
              subheaderStyle
            )
            .br();

          projects.forEach((project, idx) => {
            detail.add(`- ${project.title}: `).add(project.shortDescription);
            if (idx < projects.length - 1) {
              detail.br();
            }
          });
        }
      });
      doc.cell(spaceHrStyle);
      doc.cell(normalHrStyle);
    }
  );

  // other, such as hobby
  interestingThings(etc, doc, { headerStyle, dateStyle, spaceHrStyle });

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

  const arrayBuffer = buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength
  );
  const blob = new Blob([arrayBuffer as ArrayBuffer], { type: contentType });

  return new Response(blob, {
    headers: { "Content-Type": contentType },
  });
}
