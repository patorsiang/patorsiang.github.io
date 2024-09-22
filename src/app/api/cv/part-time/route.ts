import pdf from "pdfjs";

import { getStyle, getTokenStyle } from "@/app/api/config";

import { getDictionary } from "@/utils/getDictionaries";
import { interestingThings, partTimeFormat } from "@/app/api/lib";

import { myName } from "@/data/profile";
import { University, Info, Work } from "@/data/types/profile";

export async function GET() {
  const style = getTokenStyle("en");
  const {
    nameStyle,
    addressStyle,
    dateStyle,
    headerStyle,
    subheaderStyle,
    locationStyle,
  } = getStyle({
    type: "academic",
    locale: "en",
  });

  const { detail } = await getDictionary("en");

  const { name, shortAddress, contact, info, etc } = detail;

  const doc = new pdf.Document({
    font: style.fontFamily.regular,
    properties: {
      title: `${myName}'s cv - part-time`,
      author: myName,
      subject: `${myName}'s cv - part-time`,
      keywords: myName,
      creationDate: new Date(),
    },
  });

  // Name
  doc.text({ ...nameStyle, font: style.fontFamily.regular }).add(name);

  // Address and contact
  const addressAndContact = doc.text(addressStyle).add(shortAddress).br();
  addressAndContact
    .add(contact.Tel + ", ")
    .add(contact.Email.name)
    .br();

  const titleStyle = { ...headerStyle, underline: true };
  // ** Education **
  doc.text(titleStyle).add("Education");
  info["Education and Awards"]
    .filter((education: Info) => education?.school)
    .map(({ school, university, degree, date, location }: University) =>
      partTimeFormat(
        doc,
        {
          date,
          title: [university, school, degree],
          location,
        },
        { dateStyle, subheaderStyle, locationStyle }
      )
    );

  // ** Work experience **
  doc.text(titleStyle).add("Work experience");
  detail;
  info["Work Experience"].map(
    ({ date, title, type, company, shortDescription, location }: Work) =>
      partTimeFormat(
        doc,
        {
          date,
          title: [company, title, type],
          location,
          shortDescription,
        },
        { dateStyle, subheaderStyle, locationStyle }
      )
  );

  // ** Skill and interests **
  doc.text({ ...headerStyle, underline: true }).add("Skill and interests");
  interestingThings(etc, doc, { headerStyle, dateStyle });
  const buf = await doc.asBuffer();

  const contentType = "application/pdf";

  const blob = new Blob([buf], { type: contentType });

  return new Response(blob, {
    headers: { "Content-Type": contentType },
  });
}
