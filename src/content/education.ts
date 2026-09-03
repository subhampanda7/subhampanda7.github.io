import { GraduationCap, MonitorPlay, type LucideIcon } from "lucide-react";
import { site } from "./site";

export type Education = {
  id: string;
  qualification: string;
  institution: string;
  location: string;
  period: string;
  icon: LucideIcon;
};

export const education: Education[] = [
  {
    id: "btech",
    qualification: "Bachelor of Technology (B.Tech)",
    institution: "Bhubaneswar Engineering College",
    location: "Bhubaneswar, Odisha",
    period: "Aug 2019 — May 2022",
    icon: GraduationCap,
  },
  {
    id: "masai",
    qualification: "Full Stack Web Development",
    institution: "Masai School",
    location: "Bengaluru, Karnataka",
    period: "May 2022 — Mar 2023",
    icon: MonitorPlay,
  },
];

export const recognition = {
  title: "Rewards & Recognition",
  issuer: "Paytm",
  date: "March 2026",
  description:
    "Company-wide R&R award recognising engineering contribution to the SuperApp backend and marketing automation platform.",
  href: site.certificateUrl,
};
