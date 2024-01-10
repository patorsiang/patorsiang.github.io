export type University = {
  date: string;
  school: string;
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
};

export type Activity = {
  date: string;
  name: string;
  description: Array<string>;
};
