export type Contact = { name: string; opt: pdf.TextOptions };

export type Project = {
  title: string;
  desc: string;
  tag: string;
  skill: Array<string>;
  url: string;
};

export type Education = {
  degree: string;
  school: string;
  university?: string;
  location: string;
  date: string;
  major?: string;
  GPA?: string;
  modules?: Array<string>;
  project?: Array<Project>;
};

export type WorkExperience = {
  date: string;
  title: string;
  type: string;
  location: string;
  desc: Array<string>;
  company?: string;
};

export type Activities = {
  [key: string]: Array<string> | Array<{ title }> | string;
};

export type Interests = Array<string>;

export type Info = {
  [key: string]: Array<Education | WorkExperience> | Activities | Interests;
};

export type Data = {
  name: string;
  nickname: string;
  position: string;
  subtitle: string;
  address: string;
  contact: {
    [key: string]: string | Contact | Array<Contact>;
  };
  history: Info;
};
