export type University = {
  date: string;
  school: string;
  location: string;
  degree: string;
  university?: string;
  gpa?: string;
  major?: string;
  favoriteSubjects?: Array<string>;
};

export type Award = {
  date: string;
  name: string;
};

export type Work = {
  date: string;
  title: string;
  type: string;
  company?: string;
  location: string;
  description: Array<string>;
  shortDescription: Array<string>;
};

export type Activity = {
  date: string;
  name: string;
  description: Array<string>;
};

export type Contact = { name: string; opt: pdf.TextOptions };

export type Info = Partial<University & Award & Work & Activity>;

export type Data = {
  name: string;
  nickname: string;
  position: string;
  subtitle: string;
  summary: string;
  address: string;
  shortAddress: string;
  contact: {
    [key: string]: string | Contact;
  };
  info: { [key: string]: Array<Info> };
  etc: { [key: string]: { [key: string]: string } | Array<string> };
  references: Array<{ [key: string]: string }>;
  sortedInfoForVacancy: Array<string>;
  sortedInfoForEducation: Array<string>;
};
