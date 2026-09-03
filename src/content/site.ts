import { Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/ui/BrandIcons";
import type { SvgIcon } from "@/lib/icon";

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: SvgIcon;
};

export const site = {
  name: "Subham Panda",
  firstName: "Subham",
  lastName: "Panda",
  role: "Backend Software Engineer",
  shortRole: "Backend Engineer / SDE",
  company: "Paytm",
  location: "Bengaluru, India",
  email: "iamsubhampanda7@gmail.com",
  phone: "+91 73772 48816",
  url: "https://subhampanda7.github.io",
  availability: "Open to opportunities",
  yearsOfExperience: "3+",
  intro:
    "I build the systems people never see — event-driven backends, workflow engines and microservices that stay fast and correct while traffic, teams and edge cases pile up.",
  summary:
    "Backend Software Engineer with 3+ years building scalable microservices and distributed systems with Java, Spring Boot and Kafka on AWS. Currently at Paytm, architecting a multi-tenant SuperApp backend and an enterprise marketing automation platform.",
  resumeUrl: "/Subham_Panda_Resume.pdf",
  certificateUrl: "/paytm-rnr-certificate-mar-2026.pdf",
  githubUrl: "https://github.com/subhampanda7",
  linkedinUrl: "https://www.linkedin.com/in/subhampanda7/",
  whatsappUrl: "https://api.whatsapp.com/send?phone=7377248816&text=Hii",
} as const;

/** Phrases cycled under the hero headline. */
export const heroPhrases = [
  "Java · Spring Boot · Microservices",
  "Kafka · Temporal.io · Redis",
  "Distributed Systems · AWS · Cloud",
  "System Design · SOLID · Clean Code",
] as const;

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: site.githubUrl,
    handle: "github.com/subhampanda7",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: site.linkedinUrl,
    handle: "linkedin.com/in/subhampanda7",
    icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    handle: site.email,
    icon: Mail,
  },
  {
    label: "WhatsApp",
    href: site.whatsappUrl,
    handle: site.phone,
    icon: WhatsappIcon,
  },
];

/** Marquee strip under the hero — reads as a stack at a glance. */
export const techMarquee = [
  "Java 21",
  "Spring Boot",
  "Apache Kafka",
  "Temporal.io",
  "Redis",
  "Microservices",
  "MySQL",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Jenkins",
  "OpenTelemetry",
  "Zipkin",
  "ELK Stack",
  "Grafana",
  "Event-Driven Architecture",
] as const;

export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export type NavSection = (typeof navSections)[number];
