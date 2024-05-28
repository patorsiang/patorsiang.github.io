import { Text } from "pdfjs";
import { Work, Activity } from "@/data/types/profile";

export const listDescription = (doc: Text, data: Activity | Work) => {
  const description = data?.description;
  if (description) {
    description.forEach((desc) => {
      doc.br().add(`- ${desc}`);
    });
  }
};
