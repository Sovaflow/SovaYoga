export type Language = "en" | "ru";
export type TrainerScreen = "overview" | "schedule" | "clients" | "analytics";

export type Client = {
  name: string;
  initials: string;
  time: string;
  zone: string;
  focus: Record<Language, string>;
  status: Record<Language, string>;
  tone: "amber" | "green" | "rose";
  visits: number;
};
