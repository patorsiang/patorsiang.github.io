import { NextRequest } from "next/server";

import pdf from "pdfjs";
import fs from "fs-extra";

import Regular from "pdfjs/font/Helvetica";
import Bold from "pdfjs/font/Helvetica-Bold";
import BoldItalic from "pdfjs/font/Helvetica-BoldOblique";

import { getDictionary } from "@/utils/getDictionaries";
import { Education, WorkExperience } from "@/data/types/profile";

const types = {
  se: "Software_Developer",
  cs: "Junior_Cybersecurity_Engineer",
  ml: "Junior_Machine_Learning_Engineer",
};

const keys = Object.keys(types);

export const generateStaticParams = () => {
  return keys.map((type) => ({ type }));
};

export async function GET(
  _request: NextRequest,
  { params: { type } }: { params: { type: keyof typeof types } }
) {
  if (!keys.includes(type)) return new Response("not found", { status: 404 });

  const { detail } = await getDictionary("en");
  const { name, address, contact, summary, history } = detail;

  const doc = new pdf.Document({
    font: Regular,
    padding: 1 * pdf.cm,
    properties: {
      title: `${name}'s cv`,
      author: name,
      subject: `${name}'s cv`,
      keywords: name,
      creationDate: new Date(),
    },
    color: 0x696969,
  });

  // qr code
  const jpegImage = fs.readFileSync(process.cwd() + "/public/imgs/qrcode.jpg");

  const image = new pdf.Image(jpegImage);

  doc.image(image, { width: 64, wrap: false, y: 830, x: 510 });

  // Name
  doc.text({ font: Bold, fontSize: 16, color: 0x0f52ba }).add(name);

  // Position
  doc
    .text({ font: Regular, fontSize: 12, lineHeight: 1.5 })
    .add(types[type].replaceAll("_", " "));

  // Contact
  const contactSection = doc
    .text({ font: Regular, fontSize: 10, color: 0x6f8faf, lineHeight: 1.5 })
    .add(address);

  Object.entries(contact).forEach(([key, value], i) => {
    contactSection.add(" | ");
    if (i === 1) contactSection.br();
    if (typeof value === "string") {
      contactSection.add(value);
    } else if (Array.isArray(value)) {
      contactSection.add(key + ": ");
      value.forEach((v, i) => {
        if (i > 0) contactSection.add(" / ");
        contactSection.add(v.name, v.opt);
      });
    } else {
      contactSection.add(key + ": ");
      let v = value as { name: string; opt: pdf.TextOptions };
      contactSection.add(v.name, v.opt);
    }
  });

  // doc.cell({ borderWidth: 5, borderColor: 0xffffff });

  // summary
  // doc
  //   .text({
  //     font: Regular,
  //     fontSize: 10,
  //     color: 0xc0c0c0,
  //     textAlign: "justify",
  //   })
  //   .add(summary[type]);

  // history: each section
  Object.entries(history).forEach((item) => {
    const [key, val] = item;
    doc
      .text({ font: Bold, fontSize: 12, color: 0x4169e1, lineHeight: 2 })
      .add(key);

    doc.cell({ borderWidth: 0.5, borderColor: 0xdcdcdc });

    if (Array.isArray(val)) {
      if (val.every((v) => typeof v === "string")) {
        doc.text().add(val.join(", "));
      } else {
        val.forEach((v, i) => {
          const {
            degree,
            school,
            university,
            location,
            date,
            major,
            GPA,
            modules,
            project,
          } = v as Education;

          const { title, type, desc, company } = v as WorkExperience;

          const table = doc.table({
            widths: [449, 100],
            color: 0x696969,
          });

          const header = table.header({ color: 0x708090, font: Bold });
          header
            .cell(
              `${university ? `${university}, ` : ""}${school ?? ""}${
                title ?? ""
              }${type ? ` (${type})` : ""}`
            )
            .text()
            .br()
            .add(`${company ? `${company}, ` : ""}${location}`);

          header.cell(date);
          const row = table.row();
          if (degree) {
            row.cell(`${degree} ${major ? `-- ${major}` : ""}`);
            row.cell(`${GPA ? `GPA ${GPA}` : ""}`);
          } else {
            row.cell();
          }

          if (modules) {
            doc
              .text({ textAlign: "justify" })
              .add("Focus on:", { font: BoldItalic })
              .add(modules.join(", "), { font: Regular });
          }

          if (project) {
            const projectDoc = doc.text().add("Project:", { font: BoldItalic });

            project.forEach(({ title, desc, url, tag }) => {
              projectDoc
                .br()
                .add(`- ${title} (${tag})`, { font: Bold })
                .add(desc)
                .add(`(${url})`);
            });
          }

          if (desc) {
            const descDoc = doc
              .text()
              .add("Description:", { font: BoldItalic });

            desc.forEach((d) => {
              descDoc.br().add(`- ${d}`);
            });
          }
          if (i !== val.length - 1) {
            doc.cell({ borderWidth: 4, borderColor: 0xffffff });
          }
        });
      }
    } else if (typeof val === "object" && val !== null) {
      Object.entries(val).forEach(([k, v]) => {
        if (Array.isArray(v)) {
          const isStringList = v.every((item) => typeof item === "string");
          doc
            .text(`${k}: `, { font: Bold })
            .add(`${isStringList ? ` ${v.join(", ")}` : ""}`, {
              font: Regular,
            });
          if (!isStringList) {
            v.forEach((item) => doc.text().add(`- ${item.title}`));
          }
        } else {
          doc.text(`${k}: `, { font: Bold }).add(v, {
            font: Regular,
          });
        }
      });
    }
  });

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
